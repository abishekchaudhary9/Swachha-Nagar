const express = require('express');
const { getFleet } = require('../controllers/fleetController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/fleet — admin + staff only
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'staff', 'field_officer'),
  getFleet
);

module.exports = router;