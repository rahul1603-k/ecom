const db = require("./Backend/config/db");

(async () => {
  try {
    const [rows] = await db.query('SELECT NOW() AS currentTime;');
    console.log("✅ Database connected! Current time:", rows[0].currentTime);
    process.exit();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();
