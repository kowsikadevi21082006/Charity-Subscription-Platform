const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./index');

async function run() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema sql into individual queries
    const queries = schemaSql.split(';').filter(q => q.trim().length > 0);
    
    console.log(`Executing ${queries.length} schema queries...`);
    for (const query of queries) {
      try {
        await db.pool.query(query);
      } catch (e) {
        if (e.message.includes('already exists')) {
          // Ignore table/relation already exists
        } else {
          console.error(`Query failed: ${query}`);
          throw e;
        }
      }
    }

    console.log('✅ Schema created successfully.');

    const charities = [
      ['Hole-in-One Foundation', 'Support junior golf coaching and green programs'],
      ['Fairway Hospice', 'Community charity for equipment and special needs'],
      ['Eagle Aid', 'Funds for youth sports and education'],
    ];

    console.log('Seeding charities...');
    for (const [name, description] of charities) {
      await db.query('INSERT INTO charities (name, description) VALUES ($1,$2) ON CONFLICT (name) DO NOTHING', [name, description]);
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      const userRes = await db.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role RETURNING id',
        ['Administrator', adminEmail, hashed, 'admin']
      );
      const userId = userRes.rows[0].id;
      await db.query('INSERT INTO admins (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [userId]);
      console.log(`✅ Seed complete. Admin user initialized from env: ${adminEmail}`);
    } else {
      console.log('⚠️ Admin seed skipped: ADMIN_EMAIL and ADMIN_PASSWORD are not set in environment variables.');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ DB Initialization Failed:', err);
    process.exit(1);
  }
}

run();
