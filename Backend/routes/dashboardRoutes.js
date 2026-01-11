const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to your dashboard!` });
});

module.exports = router;
