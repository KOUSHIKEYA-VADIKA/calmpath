const express = require('express');
const router = express.Router();

/* Simple demo login */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hackathon demo users (replace later with DB)
  if (username === 'demo' && password === 'demo123') {
    return res.json({ success: true });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
