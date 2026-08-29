require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');

const http = require('http');
const { testConnection } = require('./config/db');
const { initWebSocket }  = require('./utils/websocket');
const reportRoutes    = require('./routes/reports');
const authRoutes      = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const fleetRoutes     = require('./routes/fleet');
const publicRoutes    = require('./routes/public');

const app  = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be set to a random value of at least 32 characters');
}

const allowedOrigins = (process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:5173,http://127.0.0.1:5173'))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (allowedOrigins.includes(origin)) return true;
  // Vite's HTTPS dev server may be opened on a phone through a LAN address.
  // Keep this exception development-only; production always requires CORS_ORIGIN.
  if (process.env.NODE_ENV === 'production') return false;
  try {
    return new URL(origin).port === '5173';
  } catch {
    return false;
  }
}

// Trust first proxy (needed for accurate IP rate limiting behind reverse proxies)
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ─── Ensure uploads directory exists ─────────────────────────────────────────
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  });
  if (process.env.NODE_ENV === 'production') {
    res.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  }
  next();
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || isAllowedOrigin(origin)) return callback(null, true);
    const error = new Error('Origin is not allowed');
    error.status = 403;
    return callback(error);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve uploaded photos
app.use('/uploads', express.static(uploadsDir, {
  dotfiles: 'deny',
  fallthrough: false,
  index: false,
  setHeaders: (res) => res.set('X-Content-Type-Options', 'nosniff'),
}));

// ─── Health check (no auth) ───────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'swachha-nagar-api',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/reports',   reportRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/fleet',     fleetRoutes);
app.use('/api/public',    publicRoutes);

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Unhandled error]', err);
  const status = err.status || err.statusCode || 500;
  if (status >= 500) {
    return res.status(status).json({ error: 'Internal server error' });
  }
  return res.status(status).json({ error: err.message || 'Bad request' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
async function start() {
  try {
    await testConnection();
    initWebSocket(server);
    server.listen(PORT, () => {
      console.log(`🚀  Swachha Nagar API running on http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌  Failed to connect to database:', err.message);
    console.error('   Start MySQL and check backend/.env then retry.');
    process.exit(1);
  }
}

start();
