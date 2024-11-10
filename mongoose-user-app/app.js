// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('./models/userModel');

// // Create an Express application
// const app = express();
// app.use(express.json());

// // Import the database connection
// require('./config/db');

// // Simple route to register a new user
// app.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Create a new user instance
//         const user = new User({ username, email, password });
        
//         // Save the user to the database
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully', user });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Route to create a new post
// app.post('/posts', async (req, res) => {
//     try {
//         const { title, content, userId } = req.body;
//         const post = new Post({ title, content, user: userId });
//         await post.save();
//         res.status(201).json({ message: 'Post created successfully', post });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Route to get a user with their posts using population
// app.get('/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId).populate('posts');
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.status(200).json({ user });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Route to aggregate posts count per user
// app.get('/users/posts-count', async (req, res) => {
//     try {
//         const result = await User.aggregate([
//             {
//                 $lookup: {
//                     from: 'posts',
//                     localField: '_id',
//                     foreignField: 'user',
//                     as: 'posts'
//                 }
//             },
//             {
//                 $project: {
//                     username: 1,
//                     email: 1,
//                     postsCount: { $size: '$posts' }
//                 }
//             }
//         ]);
//         res.status(200).json({ result });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Post = require('./models/postModel');  // Assuming you have a Post model

// Create an Express application
const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Import the database connection
require('./config/db');

// Simple route to register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create a new user instance
        const user = new User({ username, email, password });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to create a new post
app.post('/posts', async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        // Ensure user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post linked to the user
        const post = new Post({ title, content, user: userId });

        // Save the post to the database
        await post.save();

        // Add post reference to user
        user.posts.push(post._id);
        await user.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get a user with their posts using population
app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('posts');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to aggregate posts count per user
app.get('/users/posts-count', async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'posts'
                }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    postsCount: { $size: '$posts' }
                }
            }
        ]);
        res.status(200).json({ result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
