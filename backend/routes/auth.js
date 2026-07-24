const express = require('express');
const { login, getUsers, createUser, updateUser, deleteUser } = require('../controllers/authController');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// Admin-only user management routes
router.get('/users', verifyToken, requireRole('admin'), getUsers);
router.post('/users', verifyToken, requireRole('admin'), createUser);
router.put('/users/:id', verifyToken, requireRole('admin'), updateUser);
router.delete('/users/:id', verifyToken, requireRole('admin'), deleteUser);

module.exports = router;

