const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const {
  submitReport,
  trackReport,
  listReports,
  updateStatus,
  assignReport,
  disputeReport,
} = require('../controllers/reportController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { reportSubmissionLimiter, trackReportLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// ─── Multer — photo upload ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const safe = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `report-${safe}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|heic/;
  cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB
});

// ─── Routes ──────────────────────────────────────────────────────────────────

// Public — citizen submit (rate limited, 5 per 15 min per IP)
router.post('/', reportSubmissionLimiter, upload.single('photo'), submitReport);

// Public — citizen track by tracking code (rate limited, 30 per 15 min per IP)
router.get('/track/:trackingCode', trackReportLimiter, trackReport);

// Public — citizen dispute resolution
router.post('/track/:trackingCode/dispute', trackReportLimiter, disputeReport);

// Staff — list all reports (filterable)
router.get(
  '/',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  listReports
);

// Staff — update status (supports optional resolution photo upload)
router.patch(
  '/:id/status',
  verifyToken,
  requireRole('admin', 'field_officer', 'sanitation_worker'),
  upload.single('resolution_photo'),
  updateStatus
);

// Admin/Officer — assign report to worker/officer
router.patch(
  '/:id/assign',
  verifyToken,
  requireRole('admin', 'field_officer'),
  assignReport
);

module.exports = router;
