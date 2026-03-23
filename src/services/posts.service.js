// src/services/posts.service.js

const Post = require('../models/post.model.js'); // The service interacts with the model

/**
 * @description Create a new post in the database
 * @param {object} postData - The data for the new post
 * @returns {Promise<Document>} The newly created Mongoose document
 */
const createPost = async (postData) => {
  return await Post.create(postData);
};

const getAllPosts = async () => {
  return await Post.find().populate('author', 'username');
};

const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username');
};

const updatePost = async (id, updateData) => {
  return await Post.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};