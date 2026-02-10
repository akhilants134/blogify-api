// src/routes/posts.routes.js

const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts.controller.js");

// Order is important: static routes first
router.get("/", postController.getAllPosts);

// 5. Add the new route with the :postId parameter
router.get("/:postId", postController.getPostById);

module.exports = router;
