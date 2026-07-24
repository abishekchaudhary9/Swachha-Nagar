const jwt = require('jsonwebtoken');

/**
 * verifyToken — Express middleware.
 * Expects: Authorization: Bearer <token>
 * Attaches decoded payload to req.user on success.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;           // { id, email, role, ward, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * requireRole(...roles) — Role-guard factory.
 * Usage: router.get('/admin', verifyToken, requireRole('admin'), handler)
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Requires one of roles: ${roles.join(', ')}`,
      });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
