const { Pool } = require('pg');
require('dotenv').config();

// ใช้ connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5433, // default 5432
  max: 10,       // connection limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ทดสอบการเชื่อมต่อ
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('✅ Connected to the PostgreSQL database.');
    release();
  }
});

// Ping DB ทุก 15 นาที
setInterval(() => {
  pool.query('SELECT 1', (err) => {
    if (err) console.error('Ping error:', err.message);
  });
}, 900000);

module.exports = pool; // ✅ export pool
