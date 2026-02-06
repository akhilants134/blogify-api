// src/index.js

const express = require('express');
const app = express();
const PORT = 3000;

// 1. Import our new post router
const postRouter = require('./routes/posts.routes.js');

app.get('/welcome', (req, res) => {
  res.send('Welcome to the Blogify API!');
});

// 2. Mount the router (CRITICAL STEP)
// This connects the router to the /api/v1/posts path
app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});