// routes/userRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const validateInput = require('../middleware/validateInput'); // Import the validation middleware

const router = express.Router();

// Example route to create a user
router.post('/create', 
  // Validation middleware to check input
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email'),
    check('age').isInt({ min: 18 }).withMessage('Age must be 18 or older')
  ],
  validateInput, // Custom middleware to validate input data
  (req, res) => {
    const { name, email, age } = req.body;
    // Simulate saving user to database
    const newUser = { name, email, age };
    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  }
);

module.exports = router;
