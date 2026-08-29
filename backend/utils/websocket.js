const { WebSocketServer, WebSocket } = require('ws');
const jwt = require('jsonwebtoken');

let wss = null;

function initWebSocket(server) {
  const allowedOrigins = (process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5173,http://127.0.0.1:5173'))
    .split(',').map((origin) => origin.trim()).filter(Boolean);

  wss = new WebSocketServer({
    server,
    verifyClient: ({ origin, req }, done) => {
      if (!origin || !allowedOrigins.includes(origin)) return done(false, 403, 'Forbidden');
      const protocols = String(req.headers['sec-websocket-protocol'] || '').split(',').map((value) => value.trim());
      const token = protocols[1];
      try {
        jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        return done(true);
      } catch {
        return done(false, 401, 'Unauthorized');
      }
    },
  });

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
  });

  const interval = setInterval(() => {
    if (!wss) return;
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log('⚡ WebSocket server attached for real-time updates');
}

function broadcastEvent(type, payload) {
  if (!wss) return;
  const message = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = { initWebSocket, broadcastEvent };
