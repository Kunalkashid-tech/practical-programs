const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => res.send('Register Page'));

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Debug: log incoming data
  console.log('Request Body:', req.body);  // Check what is coming in

  // Check if all fields are filled
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Check if passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.status(201).json({ msg: 'You are now registered' }))
                .catch(err => console.log(err));
            })
          );
        }
      });
  }
});

// Login Page
router.get('/login', (req, res) => res.send('Login Page'));

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;
