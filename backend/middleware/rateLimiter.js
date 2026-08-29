const rateLimit = require('express-rate-limit');

// Protect public report submission endpoint from spam
const reportSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
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
  message: {
    error: 'Too many track requests. Please wait a few minutes before trying again.',
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
});

module.exports = {
  reportSubmissionLimiter,
  trackReportLimiter,
  loginLimiter,
};
