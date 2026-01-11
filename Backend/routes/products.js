const express = require('express');
const router = express.Router();
const pool = require('../dbPool'); // Adjust the path as necessary

// ...existing code...

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log('GET /api/products/:id ->', id);
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();
    if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Product route error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;