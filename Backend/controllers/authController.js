const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// SIGNUP Controller
exports.signup = async (req, res) => {
  console.log('Signup request received:', req.body);
  
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ 
      error: 'All fields (name, email, password) are required',
      received: { name, email, password }
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  let connection;
  try {
    connection = await db.getConnection();

    // Check if email already exists
    const [existingUsers] = await connection.query(
      'SELECT id FROM users WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Insert user into database
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    console.log('User inserted with ID:', result.insertId);

    const userId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email: email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    connection.release();

    return res.status(201).json({
      message: 'Account created successfully!',
      token: token,
      user: { 
        id: userId, 
        name: name, 
        email: email 
      }
    });

  } catch (err) {
    if (connection) connection.release();
    console.error('Signup error:', err);
    
    return res.status(500).json({ 
      error: 'Server error: ' + err.message 
    });
  }
};

// LOGIN Controller
exports.login = async (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  let connection;
  try {
    connection = await db.getConnection();

    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (rows.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    connection.release();

    return res.json({
      message: 'Login successful!',
      token: token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }
    });

  } catch (err) {
    if (connection) connection.release();
    console.error('Login error:', err);
    
    return res.status(500).json({ 
      error: 'Server error: ' + err.message 
    });
  }
};
