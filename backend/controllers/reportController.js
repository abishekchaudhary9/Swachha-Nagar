const crypto                  = require('crypto');
const fs                      = require('fs');
const exifParser              = require('exif-parser');
const { pool }                = require('../config/db');
const { sendStatusChangeEmail } = require('../utils/email');
const { broadcastEvent }        = require('../utils/websocket');
const { removeUploadedFile }    = require('../middleware/uploadValidation');

// ─── Constants ────────────────────────────────────────────────────────────────
const VALID_CATEGORIES = ['organic', 'plastic', 'e_waste', 'construction', 'other'];
const VALID_STATUSES   = ['submitted', 'acknowledged', 'in_progress', 'resolved', 'closed'];
const STATUS_TRANSITIONS = {
  submitted: ['acknowledged'],
  acknowledged: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed'],
  closed: [],
};

// Duplicate detection: same location within DEDUP_RADIUS metres + DEDUP_WINDOW minutes
const DEDUP_RADIUS = 50;     // metres
const DEDUP_WINDOW = 10;     // minutes

/** Generates a short, URL-safe uppercase tracking code, e.g. "A3F9X2" */
function generateTrackingCode() {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
}

function normaliseWard(ward) {
  return String(ward || '').replace(/^ward\s*/i, '').trim().toLowerCase();
}

function canAccessReport(user, report) {
  if (user.role === 'admin') return true;
  if (user.role === 'sanitation_worker') return Number(report.assigned_to) === Number(user.id);
  return user.role === 'field_officer' && normaliseWard(user.ward) && normaliseWard(user.ward) === normaliseWard(report.ward);
}

function validTrackingCode(code) {
  return /^(?:[A-F0-9]{8}|[A-F0-9]{12}|SN-\d{6})$/.test(String(code).toUpperCase());
}

// ─── POST /api/reports ────────────────────────────────────────────────────────
/**
 * Citizen report submission.
 * Multipart/form-data fields: category, description (opt), reporter_email (opt),
 *   latitude, longitude, ward (opt)
 * File field: photo (optional)
 */
async function submitReport(req, res) {
  const { category, description, reporter_email, latitude, longitude, ward } = req.body;

  // ── Validate category (enum only, never free text)
  if (!category || !VALID_CATEGORIES.includes(category)) {
    removeUploadedFile(req.file);
    return res.status(400).json({
      error: `category must be one of: ${VALID_CATEGORIES.join(', ')}`,
    });
  }

  // ── Validate GPS coordinates
  let lat = parseFloat(latitude);
  let lng = parseFloat(longitude);
  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    removeUploadedFile(req.file);
    return res.status(400).json({ error: 'Valid latitude and longitude are required' });
  }

  // ── Validate email if provided
  if (reporter_email) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof reporter_email !== 'string' || reporter_email.length > 191 || !emailRe.test(reporter_email)) {
      removeUploadedFile(req.file);
      return res.status(400).json({ error: 'Invalid reporter_email format' });
    }
  }
  if ((description && (typeof description !== 'string' || description.length > 5000)) ||
      (ward && (typeof ward !== 'string' || ward.length > 60))) {
    removeUploadedFile(req.file);
    return res.status(400).json({ error: 'Description or ward is too long' });
  }

  // ── Photo processing & EXIF extraction
  let photoPath = null;
  if (req.file) {
    photoPath = `uploads/${req.file.filename}`;
    try {
      // Parse EXIF metadata if JPEG/TIFF
      const buffer = fs.readFileSync(req.file.path);
      const parser = exifParser.create(buffer);
      const result = parser.parse();

      // If photo contains EXIF GPS data, we log it for audit / verification
      if (result.tags && result.tags.GPSLatitude && result.tags.GPSLongitude) {
        console.log(`[EXIF] Photo GPS embedded: Lat ${result.tags.GPSLatitude}, Lng ${result.tags.GPSLongitude}`);
      }
    } catch {
      // Non-JPEG images (PNG/WEBP) or missing EXIF header — safely continue
    }
  }

  try {
    // ── Duplicate check: existing report within DEDUP_RADIUS m in last DEDUP_WINDOW min
    const [dupes] = await pool.query(
      `SELECT id FROM reports
       WHERE created_at > DATE_SUB(NOW(), INTERVAL ? MINUTE)
         AND ST_Distance_Sphere(location, ST_GeomFromText(?)) < ?
       LIMIT 1`,
      [DEDUP_WINDOW, `POINT(${lng} ${lat})`, DEDUP_RADIUS]
    );

    if (dupes.length > 0) {
      removeUploadedFile(req.file);
      return res.status(409).json({
        error: `A report for this location was already submitted in the last ${DEDUP_WINDOW} minutes.`,
      });
    }

    // ── Unique tracking code (retry on collision — astronomically rare)
    let trackingCode;
    let attempts = 0;
    while (attempts < 5) {
      trackingCode = generateTrackingCode();
      const [existing] = await pool.query(
        'SELECT id FROM reports WHERE tracking_code = ?',
        [trackingCode]
      );
      if (existing.length === 0) break;
      attempts++;
    }

    // ── Auto-assignment logic: Find a field officer registered for this ward
    let autoAssignedTo = null;
    let initialNote = 'Report submitted by citizen';

    if (ward) {
      const [matchingOfficers] = await pool.query(
        `SELECT id, name FROM staff_users 
         WHERE role = 'field_officer' AND (ward = ? OR ward LIKE ?) 
         LIMIT 1`,
        [ward, `%${ward}%`]
      );

      if (matchingOfficers.length > 0) {
        autoAssignedTo = matchingOfficers[0].id;
        initialNote = `Report submitted by citizen & auto-assigned to ${matchingOfficers[0].name} (Ward ${ward})`;
      }
    }

    // ── Insert report
    const [result] = await pool.query(
      `INSERT INTO reports
         (tracking_code, category, description, photo_path,
          location, ward, assigned_to, reporter_email, status)
       VALUES (?, ?, ?, ?, ST_GeomFromText(?), ?, ?, ?, 'submitted')`,
      [
        trackingCode,
        category,
        description || null,
        photoPath,
        `POINT(${lng} ${lat})`,
        ward   || null,
        autoAssignedTo,
        reporter_email || null,
      ]
    );

    const reportId = result.insertId;

    // ── Write initial history row
    await pool.query(
      `INSERT INTO report_status_history (report_id, status, changed_by, note)
       VALUES (?, 'submitted', NULL, ?)`,
      [reportId, initialNote]
    );


    // ── Email confirmation (non-blocking; swallow errors so citizen never sees them)
    if (reporter_email) {
      sendStatusChangeEmail(reporter_email, trackingCode, 'submitted')
        .catch(e => console.error('[email]', e.message));
    }

    // ── Broadcast real-time event for new submission
    broadcastEvent('REPORT_SUBMITTED', { reportId, trackingCode, ward, category });

    return res.status(201).json({
      message:       'Report submitted successfully',
      tracking_code: trackingCode,
    });
  } catch (err) {
    removeUploadedFile(req.file);
    console.error('[reportController.submitReport]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── GET /api/reports/:trackingCode ──────────────────────────────────────────
/** Public — citizen tracks their own report. */
async function trackReport(req, res) {
  const { trackingCode } = req.params;
  if (!validTrackingCode(trackingCode)) return res.status(404).json({ error: 'Report not found' });

  try {
    const [rows] = await pool.query(
      `SELECT
         r.id, r.tracking_code, r.category, r.description,
         r.photo_path, r.ward, r.status, r.created_at, r.updated_at,
         ST_X(r.location) AS longitude,
         ST_Y(r.location) AS latitude,
         su.name          AS assigned_to_name
       FROM reports r
       LEFT JOIN staff_users su ON su.id = r.assigned_to
       WHERE r.tracking_code = ?`,
      [trackingCode.toUpperCase()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = rows[0];

    // Attach status history timeline
    const [history] = await pool.query(
      `SELECT rsh.status, rsh.note, rsh.created_at,
              su.name AS changed_by_name
       FROM report_status_history rsh
       LEFT JOIN staff_users su ON su.id = rsh.changed_by
       WHERE rsh.report_id = ?
       ORDER BY rsh.created_at ASC`,
      [report.id]
    );

    return res.json({ report, history });
  } catch (err) {
    console.error('[reportController.trackReport]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── GET /api/reports ─────────────────────────────────────────────────────────
/** Staff — list reports with optional filters. */
async function listReports(req, res) {
  const { status, category, ward, date_from, date_to, page = 1, limit = 50 } = req.query;

  const conditions = [];
  const params     = [];

  if (status) {
    if (!VALID_STATUSES.includes(status))
      return res.status(400).json({ error: `Invalid status: ${status}` });
    conditions.push('r.status = ?');
    params.push(status);
  }
  if (category) {
    if (!VALID_CATEGORIES.includes(category))
      return res.status(400).json({ error: `Invalid category: ${category}` });
    conditions.push('r.category = ?');
    params.push(category);
  }
  if (ward) {
    conditions.push('r.ward = ?');
    params.push(ward);
  }
  if (date_from) {
    conditions.push('r.created_at >= ?');
    params.push(date_from);
  }
  if (date_to) {
    conditions.push('r.created_at <= ?');
    params.push(date_to);
  }

  // Field officers only see reports in their own ward
  if (req.user.role === 'field_officer' && req.user.ward) {
    const wardNum = req.user.ward.replace(/^ward\s*/i, '').trim();
    conditions.push('(r.ward = ? OR r.ward = ? OR LOWER(r.ward) = LOWER(?))');
    params.push(wardNum, req.user.ward, req.user.ward);
  }

  // Sanitation Field Workers only see reports directly assigned to them
  if (req.user.role === 'sanitation_worker') {
    conditions.push('r.assigned_to = ?');
    params.push(req.user.id);
  }

  const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const pageNumber = Number.parseInt(page, 10);
  const limitNumber = Number.parseInt(limit, 10);
  if (!Number.isSafeInteger(pageNumber) || pageNumber < 1 || !Number.isSafeInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    return res.status(400).json({ error: 'page must be positive and limit must be between 1 and 100' });
  }
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM reports r ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT
         r.id, r.tracking_code, r.category, r.description,
         r.photo_path, r.ward, r.status, r.created_at, r.updated_at,
         ST_X(r.location) AS longitude,
         ST_Y(r.location) AS latitude,
         r.reporter_email,
         su.name AS assigned_to_name, su.id AS assigned_to_id
       FROM reports r
       LEFT JOIN staff_users su ON su.id = r.assigned_to
       ${where}
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limitNumber, offset]
    );

    return res.json({ total, page: pageNumber, limit: limitNumber, reports: rows });
  } catch (err) {
    console.error('[reportController.listReports]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── PATCH /api/reports/:id/status ───────────────────────────────────────────
/** Staff — update status + optional resolution photo + write history row + send email. */
async function updateStatus(req, res) {
  const { id }     = req.params;
  const { status, note } = req.body;

  if (!/^\d+$/.test(id) || !status || !VALID_STATUSES.includes(status)) {
    removeUploadedFile(req.file);
    return res.status(400).json({
      error: `status must be one of: ${VALID_STATUSES.join(', ')}`,
    });
  }
  if (note !== undefined && (typeof note !== 'string' || note.length > 2000)) {
    removeUploadedFile(req.file);
    return res.status(400).json({ error: 'Note must be at most 2000 characters' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, tracking_code, reporter_email, status, resolution_photo_path, ward, assigned_to FROM reports WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      removeUploadedFile(req.file);
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = rows[0];
    if (!canAccessReport(req.user, report)) {
      removeUploadedFile(req.file);
      return res.status(403).json({ error: 'You are not allowed to update this report' });
    }
    if (!STATUS_TRANSITIONS[report.status].includes(status)) {
      removeUploadedFile(req.file);
      return res.status(400).json({ error: `Cannot change status from ${report.status} to ${status}` });
    }

    // Mandatory Resolution Photo check when status is being set to 'resolved'
    let resolutionPhotoPath = report.resolution_photo_path;
    if (req.file) {
      resolutionPhotoPath = `uploads/${req.file.filename}`;
      try {
        const buffer = fs.readFileSync(req.file.path);
        const parser = exifParser.create(buffer);
        const result = parser.parse();
        if (result.tags && result.tags.GPSLatitude && result.tags.GPSLongitude) {
          console.log(`[EXIF Audit] Resolution photo GPS embedded: Lat ${result.tags.GPSLatitude}, Lng ${result.tags.GPSLongitude}`);
        }
      } catch {
        // Continue safely if EXIF missing
      }
    } else if (status === 'resolved' && !resolutionPhotoPath) {
      return res.status(400).json({
        error: 'A mandatory proof-of-work photo is required to mark a report as RESOLVED.',
      });
    }

    await pool.query(
      'UPDATE reports SET status = ?, resolution_photo_path = ? WHERE id = ?',
      [status, resolutionPhotoPath, id]
    );

    await pool.query(
      `INSERT INTO report_status_history (report_id, status, changed_by, note)
       VALUES (?, ?, ?, ?)`,
      [id, status, req.user.id, note || null]
    );

    // Email is MANDATORY (swallow transport errors, never 500 caller)
    sendStatusChangeEmail(report.reporter_email, report.tracking_code, status, note)
      .catch(e => console.error('[email]', e.message));

    // Broadcast real-time status change
    broadcastEvent('REPORT_STATUS_UPDATED', { id, trackingCode: report.tracking_code, status, note, resolutionPhotoPath });

    return res.json({ message: 'Status updated successfully', status, resolutionPhotoPath });
  } catch (err) {
    console.error('[reportController.updateStatus]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── POST /api/reports/track/:trackingCode/dispute ─────────────────────────
/** Citizen dispute resolution if work was faked. */
async function disputeReport(req, res) {
  const { trackingCode } = req.params;
  const { reason }       = req.body;

  if (!validTrackingCode(trackingCode) || typeof reason !== 'string' || !reason.trim() || reason.trim().length > 2000) {
    return res.status(400).json({ error: 'Dispute reason is required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, status, reporter_email, tracking_code FROM reports WHERE tracking_code = ?',
      [trackingCode.toUpperCase()]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Report not found' });
    const report = rows[0];
    if (report.status !== 'resolved') return res.status(400).json({ error: 'Only resolved reports can be disputed' });

    // Transition back to in_progress & mark is_disputed = true
    await pool.query(
      'UPDATE reports SET status = "in_progress", is_disputed = TRUE, dispute_reason = ? WHERE id = ?',
      [reason.trim(), report.id]
    );

    sendStatusChangeEmail(report.reporter_email, report.tracking_code, 'in_progress', `CITIZEN DISPUTE: ${reason.trim()}`)
      .catch(e => console.error('[email]', e.message));

    await pool.query(
      `INSERT INTO report_status_history (report_id, status, changed_by, note)
       VALUES (?, 'in_progress', NULL, ?)`,
      [report.id, `CITIZEN DISPUTE: ${reason.trim()}`]
    );

    broadcastEvent('REPORT_STATUS_UPDATED', { id: report.id, trackingCode, status: 'in_progress', is_disputed: true });

    return res.json({ message: 'Report disputed successfully. It has been re-opened for inspection.' });
  } catch (err) {
    console.error('[reportController.disputeReport]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── PATCH /api/reports/:id/assign ───────────────────────────────────────────
/** Staff/Admin — assign report to a field officer. */
async function assignReport(req, res) {
  const { id }         = req.params;
  const { assigned_to } = req.body;

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(assigned_to)) || Number(assigned_to) < 1) {
    return res.status(400).json({ error: 'assigned_to (staff user id) is required' });
  }

  try {
    // Verify the target user exists and is a field_officer
    const [users] = await pool.query(
      'SELECT id, name, role, ward FROM staff_users WHERE id = ?',
      [assigned_to]
    );
    if (users.length === 0) {
      return res.status(404).json({ error: 'Staff user not found' });
    }
    if (req.user.role === 'field_officer' && users[0].role !== 'sanitation_worker') {
      return res.status(400).json({ error: 'Ward Officers can only assign tasks to Sanitation Field Workers' });
    }
    if (users[0].role !== 'field_officer' && users[0].role !== 'sanitation_worker') {
      return res.status(400).json({ error: 'Reports can only be assigned to field officers or sanitation workers' });
    }

    // Check current report status
    const [reports] = await pool.query('SELECT status, ward, assigned_to FROM reports WHERE id = ?', [id]);
    if (reports.length === 0) return res.status(404).json({ error: 'Report not found' });
    const currentReport = reports[0];
    if (!canAccessReport(req.user, currentReport)) return res.status(403).json({ error: 'You are not allowed to assign this report' });
    if (req.user.role === 'field_officer' && normaliseWard(users[0].ward) !== normaliseWard(req.user.ward)) {
      return res.status(400).json({ error: 'Ward Officers can only assign staff from their own ward' });
    }
    const currentStatus = currentReport.status;

    // Update assignment
    await pool.query(
      'UPDATE reports SET assigned_to = ? WHERE id = ?',
      [assigned_to, id]
    );

    // If report was still 'submitted', transition it to 'acknowledged' automatically
    if (currentStatus === 'submitted') {
      await pool.query('UPDATE reports SET status = ? WHERE id = ?', ['acknowledged', id]);
      await pool.query(
        `INSERT INTO report_status_history (report_id, status, changed_by, note)
         VALUES (?, 'acknowledged', ?, ?)`,
        [id, req.user.id, `Assigned to ${users[0].name}`]
      );
    }

    // Broadcast real-time assignment
    broadcastEvent('REPORT_ASSIGNED', { id, assignedTo: users[0] });

    return res.json({ message: 'Report assigned', assigned_to: users[0] });
  } catch (err) {
    console.error('[reportController.assignReport]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { submitReport, trackReport, listReports, updateStatus, assignReport, disputeReport };
