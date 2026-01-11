const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// GET all orders for user
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const [items] = await connection.query(
          'SELECT * FROM order_items WHERE order_id = ?',
          [order.id]
        );
        return { ...order, items };
      })
    );

    connection.release();
    res.json(ordersWithItems);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];

    const [items] = await connection.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [order.id]
    );

    const [address] = await connection.query(
      'SELECT * FROM shipping_addresses WHERE order_id = ?',
      [order.id]
    );

    connection.release();

    res.json({
      ...order,
      items,
      shippingAddress: address[0] || {}
    });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// CREATE new order
router.post('/', authMiddleware, async (req, res) => {
  const { items, total, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
      [req.user.id, total, 'pending']
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [orderId, item._id || item.id, item.name, item.price, item.quantity]
      );
    }

    // Insert shipping address
    const { fullName, email, phone, address, city, state, zip } = shippingAddress;
    await connection.query(
      'INSERT INTO shipping_addresses (order_id, full_name, email, phone, address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [orderId, fullName, email, phone, address, city, state, zip]
    );

    await connection.commit();

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId
    });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
