const express = require('express');
const { login, getUsers, createUser, updateUser, deleteUser } = require('../controllers/authController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginLimiter, login);

// Admin-only user management routes
router.get('/users', verifyToken, requireRole('admin', 'field_officer'), getUsers);
router.post('/users', verifyToken, requireRole('admin'), createUser);
router.put('/users/:id', verifyToken, requireRole('admin'), updateUser);
router.delete('/users/:id', verifyToken, requireRole('admin'), deleteUser);

module.exports = router;
