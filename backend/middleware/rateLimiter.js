const rateLimit = require('express-rate-limit');

// Helper to determine if request is from developer/local environment
const isDevOrLocal = (req) => {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) return true;
  const ip = req.ip || req.connection.remoteAddress;
  return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
};

// Protect public report submission endpoint from spam
const reportSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevOrLocal(req) && process.env.ENABLE_RATE_LIMIT !== 'true',
  message: {
    error: 'Too many reports submitted from this IP address. Please try again after 15 minutes.',
  },
});

// Protect tracking endpoint from brute-force searches
const trackReportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 30, // Limit each IP to 30 track requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevOrLocal(req) && process.env.ENABLE_RATE_LIMIT !== 'true',
  message: {
    error: 'Too many track requests. Please wait a few minutes before trying again.',
  },
});

module.exports = {
  reportSubmissionLimiter,
  trackReportLimiter,
};
