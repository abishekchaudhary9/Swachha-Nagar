// ============================================================
// Swachha Nagar — Demo data seeder
// Usage: node database/seed-demo.js
// Inserts ~55 realistic reports across wards with full status
// history so the staff dashboard, wards, hotspots, fleet and
// analytics pages all render meaningful data.
// Idempotent: wipes any existing SN-* demo reports first.
// ============================================================

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { pool } = require('../config/db');

const WARDS = [
  'Ward 12', 'Ward 13', 'Ward 14', 'Ward 15', 'Ward 16',
  'Ward 17', 'Ward 18', 'Ward 19', 'Ward 20',
];

const CATEGORIES = ['organic', 'plastic', 'e_waste', 'construction', 'other'];

const DESCRIPTIONS = {
  organic: 'Large pile of organic waste dumped on the roadside near the market, attracting stray animals and producing a strong smell.',
  plastic: 'Discarded plastic bags and packaging litter scattered along the street drain; not collected for over a week.',
  e_waste: 'Abandoned refrigerator and broken electronic items dumped near the community open space.',
  construction: 'Construction debris and sand dumped on the public footpath after the recent renovation; blocking pedestrians.',
  other: 'Mixed household waste dumped behind the local temple complex; needs immediate clearing.',
};

// Deterministic PRNG so re-runs produce identical data
let seed = 42;
function rnd() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
function rint(min, max) {
  return Math.floor(rnd() * (max - min + 1)) + min;
}
function pick(arr) {
  return arr[Math.floor(rnd() * arr.length)];
}
function pad(n, w) {
  return String(n).padStart(w, '0');
}
function randPoint() {
  const lat = 27.63 + rnd() * 0.12;
  const lng = 85.22 + rnd() * 0.16;
  return `POINT(${lng.toFixed(6)} ${lat.toFixed(6)})`;
}
// Ward 12 gets 2x weight so demo staff (Ward 12) always have visible load
function pickWard() {
  return rnd() < 0.18 ? 'Ward 12' : WARDS[rint(0, WARDS.length - 1)];
}
function statusFor(ageDays) {
  if (ageDays <= 1) return 'submitted';
  if (ageDays <= 3) return 'acknowledged';
  if (ageDays <= 7) return 'in_progress';
  if (ageDays <= 20) return rnd() < 0.85 ? 'resolved' : 'in_progress';
  return rnd() < 0.75 ? 'resolved' : 'closed';
}

// History timeline (hours after created_at) per status
const DELAY = {
  acknowledged: () => rint(1, 8),
  in_progress:  () => rint(10, 30),
  resolved:     () => rint(36, 130),
  closed:       () => rint(140, 200),
};

async function main() {
  const conn = await pool.getConnection();

  // 1. Wipe previous demo data (SN-* tracking codes)
  await conn.query(
    `DELETE h FROM report_status_history h
     INNER JOIN reports r ON r.id = h.report_id
     WHERE r.tracking_code LIKE 'SN-%'`
  );
  await conn.query(`DELETE FROM reports WHERE tracking_code LIKE 'SN-%'`);

  const counts = { submitted: 0, acknowledged: 0, in_progress: 0, resolved: 0, closed: 0 };
  const now = new Date();
  const total = 55;

  for (let i = 0; i < total; i++) {
    const tracking = `SN-${pad(100000 + i, 6)}`;
    const category = pick(CATEGORIES);
    const ward = pickWard();
    const ageDays = Math.round(rnd() * 38) + 1;
    const status = statusFor(ageDays);
    counts[status]++;

    const created = new Date(now.getTime() - ageDays * 24 * 3600 * 1000);
    const isResolved = status === 'resolved' || status === 'closed';
    const assignedTo = ward === 'Ward 12' ? (i % 2 === 0 ? 2 : 3) : null;

    const [r] = await conn.query(
      `INSERT INTO reports
        (tracking_code, category, description, photo_path, resolution_photo_path,
         location, ward, reporter_email, status, assigned_to,
         is_disputed, dispute_reason, created_at)
       VALUES (?, ?, ?, ?, ?, ST_GeomFromText(?), ?, ?, ?, ?, ?, ?, ?)`,
      [
        tracking,
        category,
        DESCRIPTIONS[category],
        '/uploads/SN-demo.jpg',
        isResolved ? `/uploads/resolution/${tracking}.jpg` : null,
        randPoint(),
        ward,
        rnd() < 0.8 ? `citizen${rint(1, 40)}@gmail.com` : null,
        status,
        assignedTo,
        status === 'closed' && rnd() < 0.15 ? 1 : 0,
        status === 'closed' && rnd() < 0.15 ? 'Citizen reported the issue was resolved but reappeared within days.' : null,
        created,
      ]
    );
    const reportId = r[0] ? r[0].insertId : r.insertId;

    // 2. Status history
    await conn.query(
      `INSERT INTO report_status_history (report_id, status, changed_by, note, created_at)
       VALUES (?, 'submitted', NULL, 'Report submitted by citizen', ?)`,
      [reportId, created]
    );

    let cursor = created;
    for (const st of ['acknowledged', 'in_progress', 'resolved', 'closed']) {
      const idx = ['acknowledged', 'in_progress', 'resolved', 'closed'].indexOf(st);
      const maxStatuses = ['submitted', 'acknowledged', 'in_progress', 'resolved', 'closed'].indexOf(status);
      if (idx >= maxStatuses) break;

      cursor = new Date(cursor.getTime() + DELAY[st]() * 3600 * 1000);
      const note =
        st === 'acknowledged' ? 'Report verified and acknowledged by ward office' :
        st === 'in_progress'  ? 'Cleanup crew dispatched to location' :
        st === 'resolved'     ? 'Site cleaned; proof of work uploaded' :
                                'Report closed after verification';

      await conn.query(
        `INSERT INTO report_status_history (report_id, status, changed_by, note, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [reportId, st, assignedTo || 1, note, cursor]
      );
    }
  }

  conn.release();

  console.log('✅ Demo data inserted:');
  console.log('   ' + JSON.stringify(counts, null, 2));
  console.log('   Total reports: ' + total);
  console.log('   Ward 12 reports assigned to demo staff (field officer / worker).');
  await pool.end();
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});