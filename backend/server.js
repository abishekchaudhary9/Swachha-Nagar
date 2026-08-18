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

// Trust first proxy (needed for accurate IP rate limiting behind reverse proxies)
app.set('trust proxy', 1);

// ─── Ensure uploads directory exists ─────────────────────────────────────────
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded photos
app.use('/uploads', express.static(uploadsDir));

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
  res.status(500).json({ error: 'Internal server error' });
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
