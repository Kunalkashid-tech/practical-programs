const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Database Connection
mongoose.connect('mongodb://localhost:27017/auth-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    
// Bodyparser Middleware
app.use(express.json());  // To parse JSON data
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Routes
app.use('/auth', require('./routes/auth'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
