const { pool } = require('../config/db');

/**
 * GET /api/analytics
 * Staff only.
 * Returns:
 *  - reportsByCategory: count per category
 *  - avgResolutionTimeHours: average time from submitted → resolved (hours)
 *  - hotspotWards: top 10 wards by report count
 *  - statusBreakdown: count per status
 */
async function getAnalytics(req, res) {
  try {
    // 1. Reports per category
    const [byCategory] = await pool.query(
      `SELECT category, COUNT(*) AS count
       FROM reports
       GROUP BY category
       ORDER BY count DESC`
    );

    // 2. Average resolution time (submitted → resolved)
    const [resolution] = await pool.query(
      `SELECT
         AVG(
           TIMESTAMPDIFF(MINUTE, r.created_at, rsh.created_at)
         ) / 60 AS avg_resolution_hours
       FROM reports r
       INNER JOIN report_status_history rsh
         ON rsh.report_id = r.id AND rsh.status = 'resolved'`
    );

    // 3. Hotspot wards (top 10)
    const [hotspotWards] = await pool.query(
      `SELECT ward, COUNT(*) AS count
       FROM reports
       WHERE ward IS NOT NULL
       GROUP BY ward
       ORDER BY count DESC
       LIMIT 10`
    );

    // 4. Status breakdown
    const [statusBreakdown] = await pool.query(
      `SELECT status, COUNT(*) AS count
       FROM reports
       GROUP BY status`
    );

    // 5. Reports created per day (last 30 days)
    const [dailyTrend] = await pool.query(
      `SELECT DATE(created_at) AS date, COUNT(*) AS count
       FROM reports
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    return res.json({
      reportsByCategory: byCategory,
      avgResolutionHours: resolution[0]?.avg_resolution_hours ?? null,
      hotspotWards,
      statusBreakdown,
      dailyTrend,
    });
  } catch (err) {
    console.error('[analyticsController.getAnalytics]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAnalytics };
