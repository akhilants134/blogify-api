// src/routes/posts.routes.js

const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts.controller.js");
const protect = require("../middleware/auth.middleware.js");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", protect, postController.createPost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

module.exports = router;
