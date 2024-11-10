const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../utils/auth');

// Public Route
router.get('/', (req, res) => res.send('Welcome to the homepage'));

// Dashboard (Protected)
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`Hello ${req.user.name}, you are a ${req.user.role}`);
});

// Admin Route (Protected for Admins)
router.get('/admin', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.send('Welcome to the admin panel');
});

module.exports = router;
