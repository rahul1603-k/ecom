const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const sqlPath = path.resolve(__dirname, '..', 'schema.sql');
    const schema = fs.readFileSync(sqlPath, 'utf8');

    const config = {
      host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQL_HOST,
      user: process.env.DB_USER || process.env.MYSQLUSER || process.env.MYSQL_USER,
      password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway',
      port: Number(process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306),
      multipleStatements: true
    };

    const conn = await mysql.createConnection(config);
    await conn.query(schema);
    await conn.end();

    console.log('✓ Schema applied successfully');
    process.exit(0);
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exit(1);
  }
})();
