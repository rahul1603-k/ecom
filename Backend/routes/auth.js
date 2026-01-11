const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../config/db');

// SIGNUP route
router.post('/signup', signup);

// LOGIN route
router.post('/login', login);

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
