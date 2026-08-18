const express = require('express');
const { getFleet } = require('../controllers/fleetController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/fleet — all staff roles
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  getFleet
);

module.exports = router;