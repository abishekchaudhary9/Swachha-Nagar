const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/analytics — admin + staff only
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'staff'),
  getAnalytics
);

module.exports = router;
