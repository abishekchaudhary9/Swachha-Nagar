const nodemailer = require('nodemailer');
require('dotenv').config();

// ─── Transport ─────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: process.env.SMTP_SECURE === 'true',  // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Status display labels for email copy
const STATUS_LABELS = {
  submitted:    'Submitted',
  acknowledged: 'Acknowledged',
  in_progress:  'In Progress',
  resolved:     'Resolved',
  closed:       'Closed',
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

/**
 * sendStatusChangeEmail
 * Called on every report status change and on initial submission.
 *
 * @param {string} reporterEmail  - Recipient address
 * @param {string} trackingCode   - Public tracking code
 * @param {string} newStatus      - One of the STATUS_LABELS keys
 * @param {string|null} note      - Optional staff note
 */
async function sendStatusChangeEmail(reporterEmail, trackingCode, newStatus, note = null) {
  if (!reporterEmail) return;   // citizen didn't provide email — silently skip

  const label     = STATUS_LABELS[newStatus] ?? newStatus;
  const safeTrackingCode = escapeHtml(trackingCode);
  const safeLabel = escapeHtml(label);
  const safeNote = note ? escapeHtml(note) : null;
  const appUrl = process.env.APP_URL || 'http://localhost:5173';
  let trackUrl;
  try {
    trackUrl = new URL(`/track/${encodeURIComponent(trackingCode)}`, appUrl).toString();
  } catch {
    throw new Error('APP_URL must be a valid absolute URL');
  }

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:520px;margin:auto;color:#1a1c1c;">
      <div style="background:#005440;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#ffffff;margin:0;font-size:22px;">Swachha Nagar</h1>
        <p style="color:#9aedcf;margin:4px 0 0;font-size:14px;">Civic Waste Reporting Platform</p>
      </div>
      <div style="background:#ffffff;padding:32px;border:1px solid #e2e2e2;border-radius:0 0 12px 12px;">
        <p style="font-size:16px;margin-top:0;">
          Your report <strong>${safeTrackingCode}</strong> has been updated.
        </p>
        <div style="background:#f3f3f3;border-radius:8px;padding:16px;margin:16px 0;">
          <span style="font-size:12px;font-weight:600;text-transform:uppercase;color:#3f4944;letter-spacing:0.05em;">
            New Status
          </span>
          <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#005440;">${safeLabel}</p>
        </div>
        ${safeNote ? `<p style="font-size:14px;color:#3f4944;"><strong>Note from staff:</strong> ${safeNote}</p>` : ''}
        <a href="${trackUrl}"
           style="display:inline-block;margin-top:16px;background:#005440;color:#ffffff;
                  text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">
          Track your report →
        </a>
        <p style="font-size:12px;color:#6f7a74;margin-top:24px;">
          Tracking code: <code>${safeTrackingCode}</code>
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM || `"Swachha Nagar" <${process.env.SMTP_USER}>`,
    to:      reporterEmail,
    subject: `[${trackingCode}] Report status updated to: ${label}`,
    html,
  });
}

module.exports = { sendStatusChangeEmail };
