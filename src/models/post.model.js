// src/models/post.model.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title is required for the post.'],
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    // --- ADD THIS NEW FIELD ---
    author: {
      type: mongoose.Schema.Types.ObjectId, // The data type will be a MongoDB ObjectId
      ref: 'User', // This tells Mongoose the 'author' field is a reference to the 'User' model
      required: true,
    },
    // --- END OF NEW FIELD ---
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;