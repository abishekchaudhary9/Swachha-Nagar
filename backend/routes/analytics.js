const express = require('express');
const {
  getAnalytics,
  getWardAnalytics,
  getHotspots,
} = require('../controllers/analyticsController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/analytics — admin + staff only
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'staff'),
  getAnalytics
);

// GET /api/analytics/wards — admin + staff only
router.get(
  '/wards',
  verifyToken,
  requireRole('admin', 'staff'),
  getWardAnalytics
);

// GET /api/analytics/hotspots — admin + staff only
router.get(
  '/hotspots',
  verifyToken,
  requireRole('admin', 'staff'),
  getHotspots
);

module.exports = router;
