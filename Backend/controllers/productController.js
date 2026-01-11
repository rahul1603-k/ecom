const db = require('../config/db');

// Get all products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Add a new product
exports.addProduct = (req, res) => {
  const { name, description, price, image_url } = req.body;
  if (!name || !price)
    return res.status(400).json({ error: 'Name and price are required' });

  db.query(
    'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)',
    [name, description || '', price, image_url || ''],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Product added successfully!' });
    }
  );
};
