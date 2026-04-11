const mongoose = require("mongoose");

const Post = require("../models/Post.js");

const isValidObjectId = (id) => mongoose.isValidObjectId(id);

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email");

  res.status(200).json({
    success: true,
    data: posts,
  });
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post id",
    });
  }

  const post = await Post.findById(id).populate("author", "name email");

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  res.status(200).json({
    success: true,
    data: post,
  });
};

const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const post = await Post.create({
    title,
    content,
    author: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: post,
  });
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post id",
    });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this post",
    });
  }

  post.title = req.body.title ?? post.title;
  post.content = req.body.content ?? post.content;

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post id",
    });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this post",
    });
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
