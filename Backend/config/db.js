const mysql = require("mysql2/promise");
require("dotenv").config();

// Support both local .env and Railway-provided env vars
const config = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQL_HOST,
  user: process.env.DB_USER || process.env.MYSQLUSER || process.env.MYSQL_USER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "railway",
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

module.exports = pool;
