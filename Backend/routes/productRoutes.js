const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE category = ?',
      [req.params.category]
    );
    connection.release();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ADD new product
router.post('/', async (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const connection = await db.getConnection();
    const [result] = await connection.query(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description || '', price, stock || 50, category || 'general', image_url || '']
    );
    connection.release();

    res.status(201).json({
      message: 'Product added successfully!',
      id: result.insertId
    });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
