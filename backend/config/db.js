const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'swachha_nagar',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  // Return date objects rather than strings
  dateStrings:        false,
});

// Quick connectivity check (called from server.js on startup)
async function testConnection() {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
  console.log('✅  MySQL connected successfully');
}

module.exports = { pool, testConnection };
