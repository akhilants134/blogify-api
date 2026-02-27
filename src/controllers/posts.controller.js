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
const getPostById = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    data: {
      message: `Details for post ${id}`
    }
  });
};

// 4. Export the new function
module.exports = {
  getAllPosts,
  getPostById,
};