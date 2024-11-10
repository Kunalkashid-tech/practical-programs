const mongoose = require('mongoose');

// Define the post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [10, 'Content must be at least 10 characters long'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
}, {
    timestamps: true
});

// Create and export the Post model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
