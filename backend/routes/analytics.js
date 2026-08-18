const express = require('express');
const {
  getAnalytics,
  getWardAnalytics,
  getHotspots,
} = require('../controllers/analyticsController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/analytics — all staff roles
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  getAnalytics
);

// GET /api/analytics/wards — all staff roles
router.get(
  '/wards',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  getWardAnalytics
);

// GET /api/analytics/hotspots — all staff roles
router.get(
  '/hotspots',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  getHotspots
);

module.exports = router;
