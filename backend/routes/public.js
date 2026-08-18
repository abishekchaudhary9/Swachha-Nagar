const express = require('express');
const { getPublicStats } = require('../controllers/publicController');

const router = express.Router();

// GET /api/public/stats — public landing page stats (no auth)
router.get('/stats', getPublicStats);

module.exports = router;