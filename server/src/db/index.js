const { Pool } = require('pg');
require('dotenv').config();

// ✅ Safely handle undefined + remove hidden spaces/newlines
const connectionString = (process.env.DATABASE_URL || "").trim();

// ✅ Debug log (very important for you now)
console.log("DB URL:", connectionString);

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ✅ Add error listener to prevent process crashes
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};