// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for logging requests
app.use((req, res, next) => {
    const { method, url } = req;
    const date = new Date();
    console.log(`[${date.toISOString()}] ${method} ${url}`);
    next();
});

// Middleware to handle JSON request bodies
app.use(express.json());

// Sample route for demonstration
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Another sample route to trigger an error
app.get('/error', (req, res) => {
    throw new Error('This is a test error');
});

// Middleware for handling errors gracefully
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
