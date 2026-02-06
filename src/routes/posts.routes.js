// src/routes/posts.routes.js

const express = require('express');
const router = express.Router();

// This route corresponds to GET /api/v1/posts/
router.get('/', (req, res) => {
  res.send('Fetching all blog posts from the modular router!');
});

// REMOVED "cite:" from the parameters below
router.get('/welcome', (req, res) => {
  res.send('Welcome to the Posts section of the Blogify API!');
});

// Route for creating a post (POST /api/v1/posts/)
router.post('/', (req, res) => {
  res.send('Creating a new blog post...');
});

module.exports = router;