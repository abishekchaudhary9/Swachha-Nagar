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

/**
 * GET /api/analytics/wards
 * Staff only. Per-ward performance: report volume, resolution rate,
 * average cleanup time and assigned officer.
 */
async function getWardAnalytics(req, res) {
  try {
    const [wards] = await pool.query(
      `SELECT
         COALESCE(r.ward, 'Unassigned') AS ward,
         COUNT(*) AS count,
         SUM(CASE WHEN r.status IN ('resolved', 'closed') THEN 1 ELSE 0 END) AS resolved,
         ROUND(
           100 * SUM(CASE WHEN r.status IN ('resolved', 'closed') THEN 1 ELSE 0 END) / COUNT(*),
           1
         ) AS resolution_rate,
         (
           SELECT ROUND(AVG(TIMESTAMPDIFF(MINUTE, rr.created_at, rsh.created_at)) / 60, 1)
           FROM reports rr
           INNER JOIN report_status_history rsh
             ON rsh.report_id = rr.id AND rsh.status = 'resolved'
           WHERE rr.ward = r.ward
         ) AS avg_resolution_hours,
         (SELECT su.name FROM staff_users su
           WHERE su.role = 'field_officer' AND su.ward = r.ward
           LIMIT 1) AS officer_name
       FROM reports r
       GROUP BY r.ward
       ORDER BY count DESC`
    );

    return res.json({ wards });
  } catch (err) {
    console.error('[analyticsController.getWardAnalytics]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /api/analytics/hotspots
 * Staff only. High-density zones by ward with trend + 7-day forecast.
 * Trend compares last 7 days vs the previous 7 days per ward.
 */
async function getHotspots(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT
         ward,
         COUNT(*) AS density,
         SUM(CASE WHEN status IN ('resolved', 'closed') THEN 1 ELSE 0 END) AS resolved,
         ROUND(
           100 * SUM(CASE WHEN status IN ('resolved', 'closed') THEN 1 ELSE 0 END) / COUNT(*),
           1
         ) AS resolution_rate,
         SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS last7,
         SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
                   AND created_at <  DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS prev7
       FROM reports
       WHERE ward IS NOT NULL
       GROUP BY ward
       HAVING density >= 2
       ORDER BY density DESC`
    );

    const hotspots = rows.map((r, i) => {
      const last7 = r.last7 || 0;
      const prev7 = r.prev7 || 0;
      const trend = prev7 === 0
        ? (last7 > 0 ? 'rising' : 'stable')
        : last7 > prev7 * 1.15
          ? 'rising'
          : last7 < prev7 * 0.85
            ? 'declining'
            : 'stable';
      const growth = prev7 > 0 ? last7 / prev7 : 1;
      const dailyRate = last7 > 0 ? last7 / 7 : (r.density || 1) / 30;
      const forecast = Math.round(dailyRate * 7 * growth);

      return {
        id: i + 1,
        ward: r.ward,
        density: r.density,
        resolution_rate: r.resolution_rate,
        trend,
        forecast: Math.max(forecast, last7 || r.density),
      };
    });

    return res.json({ hotspots });
  } catch (err) {
    console.error('[analyticsController.getHotspots]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAnalytics, getWardAnalytics, getHotspots };
