// src/controllers/posts.controller.js

const getAllPosts = (req, res) => {
  const posts = [
    { id: 1, title: "Controller Post 1" },
    { id: 2, title: "Controller Post 2" },
  ];

  res.status(200).json({
    message: "Route handled by postController.getAllPosts",
    data: posts,
  });
};

// 1. Create the new async function
const getPostById = async (req, res) => {
  // 2. Retrieve the post ID from req.params.postId
  const postId = req.params.postId;

  // 3. Send the JSON response
  res.status(200).json({
    message: "Fetching data for post with ID: " + postId
  });
};

// 4. Export the new function
module.exports = {
  getAllPosts,
  getPostById,
};