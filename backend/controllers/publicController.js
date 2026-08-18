const { pool } = require('../config/db');

/**
 * GET /api/public/stats
 * No auth. Public landing-page statistics:
 * total reports, resolved/open counts, avg resolution hours,
 * wards covered, category breakdown and top wards.
 */
async function getPublicStats(req, res) {
  try {
    const [[totals]] = await pool.query(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved,
         SUM(CASE WHEN status IN ('submitted', 'acknowledged', 'in_progress') THEN 1 ELSE 0 END) AS open
       FROM reports`
    );

    const [[resolution]] = await pool.query(
      `SELECT ROUND(AVG(TIMESTAMPDIFF(MINUTE, r.created_at, rsh.created_at)) / 60, 1) AS hours
       FROM reports r
       INNER JOIN report_status_history rsh
         ON rsh.report_id = r.id AND rsh.status = 'resolved'`
    );
    const avgHours = resolution?.hours != null ? parseFloat(resolution.hours) : null;

    const [[wardCount]] = await pool.query(
      `SELECT COUNT(DISTINCT ward) AS wards
       FROM reports
       WHERE ward IS NOT NULL`
    );

    const [categories] = await pool.query(
      `SELECT category, COUNT(*) AS count
       FROM reports
       GROUP BY category
       ORDER BY count DESC`
    );

    const [topWards] = await pool.query(
      `SELECT ward, COUNT(*) AS count
       FROM reports
       WHERE ward IS NOT NULL
       GROUP BY ward
       ORDER BY count DESC
       LIMIT 5`
    );

    return res.json({
      total_reports: totals.total || 0,
      resolved_reports: totals.resolved || 0,
      open_reports: totals.open || 0,
      avg_resolution_hours: avgHours,
      wards_covered: wardCount.wards || 0,
      categories,
      top_wards: topWards,
    });
  } catch (err) {
    console.error('[publicController.getPublicStats]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getPublicStats };