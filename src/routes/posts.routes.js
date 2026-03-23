// src/routes/posts.routes.js

const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts.controller.js");

// Order is important: static routes first
router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

// 5. Add the new route with the :postId parameter
router.get('/:id', postController.getPostById);

module.exports = router;
