const bcrypt  = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { pool } = require('../config/db');

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user: { id, name, email, role, ward } }
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash, role, ward FROM staff_users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      id:    user.id,
      email: user.email,
      role:  user.role,
      ward:  user.ward,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    return res.json({
      token,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        ward:  user.ward,
      },
    });
  } catch (err) {
    console.error('[authController.login]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


/**
 * GET /api/auth/users
 * Returns list of staff users.
 */
async function getUsers(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, ward, created_at FROM staff_users ORDER BY created_at DESC'
    );
    return res.json({ users: rows });
  } catch (err) {
    console.error('[authController.getUsers]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * POST /api/auth/users
 * Body: { name, email, password, role, ward }
 */
async function createUser(req, res) {
  const { name, email, password, role, ward } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required' });
  }

  const validRoles = ['field_officer', 'sanitation_worker'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `Role must be one of: ${validRoles.join(', ')}` });
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM staff_users WHERE email = ?',
      [email.toLowerCase().trim()]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO staff_users (name, email, password_hash, role, ward) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash, role, ward || null]
    );

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: result.insertId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role,
        ward: ward || null,
      },
    });
  } catch (err) {
    console.error('[authController.createUser]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * PUT /api/auth/users/:id
 * Body: { name, role, ward }
 */
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, role, ward } = req.body;

  if (parseInt(id, 10) === req.user.id) {
    return res.status(400).json({ error: 'You cannot modify your own account from here' });
  }

  const validRoles = ['field_officer', 'sanitation_worker'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ error: `Role must be one of: ${validRoles.join(', ')}` });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM staff_users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = [];
    const params = [];
    if (name) { updates.push('name = ?'); params.push(name.trim()); }
    if (role) { updates.push('role = ?'); params.push(role); }
    // Allow setting ward to null (city-wide)
    if (ward !== undefined) { updates.push('ward = ?'); params.push(ward || null); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(id);
    await pool.query(`UPDATE staff_users SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query(
      'SELECT id, name, email, role, ward, created_at FROM staff_users WHERE id = ?',
      [id]
    );

    return res.json({ message: 'User updated successfully', user: updated[0] });
  } catch (err) {
    console.error('[authController.updateUser]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * DELETE /api/auth/users/:id
 */
async function deleteUser(req, res) {
  const { id } = req.params;

  if (parseInt(id, 10) === req.user.id) {
    return res.status(400).json({ error: 'You cannot delete your own account' });
  }

  try {
    const [result] = await pool.query('DELETE FROM staff_users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('[authController.deleteUser]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { login, getUsers, createUser, updateUser, deleteUser };

