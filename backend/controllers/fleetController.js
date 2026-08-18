const { pool } = require('../config/db');

const VEHICLES = ['Collection Truck', 'Mini Tipper', 'Dumper', 'Tractor Trolley', 'Loader'];

/**
 * GET /api/fleet
 * Staff only. Fleet units derived from field staff + sanitation workers.
 * Each unit reports live status (on_route when carrying an active report),
 * current load and active report tracking code.
 */
async function getFleet(req, res) {
  try {
    const [staff] = await pool.query(
      `SELECT id, name, role, ward
       FROM staff_users
       WHERE role IN ('field_officer', 'sanitation_worker')
       ORDER BY id ASC`
    );

    const [activeReports] = await pool.query(
      `SELECT
         r.assigned_to, r.tracking_code, r.status
       FROM reports r
       WHERE r.assigned_to IS NOT NULL
         AND r.status IN ('submitted', 'acknowledged', 'in_progress')
       ORDER BY r.created_at DESC`
    );

    const byStaff = {};
    activeReports.forEach(rp => {
      if (!byStaff[rp.assigned_to]) byStaff[rp.assigned_to] = [];
      byStaff[rp.assigned_to].push(rp);
    });

    const units = staff.map(s => {
      const active = byStaff[s.id] || [];
      const onRoute = active.some(rp => rp.status === 'in_progress');
      const status = active.length === 0
        ? 'active'
        : onRoute
          ? 'on_route'
          : 'active';

      return {
        id: s.id,
        name: s.name,
        role: s.role,
        vehicle: VEHICLES[s.id % VEHICLES.length],
        ward: s.ward,
        status,
        load: Math.min(100, active.length * 25),
        current_tracking_code: active[0]?.tracking_code || null,
        active_reports: active.length,
      };
    });

    return res.json({ units });
  } catch (err) {
    console.error('[fleetController.getFleet]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getFleet };