const postService = require('../services/posts.service.js');

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: { message: `Resource not found with id of ${id}` },
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const newPost = await postService.createPost(req.body); 
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPost = await postService.updatePost(id, updateData);

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        error: { message: `Post with ID ${id} not found` }
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await postService.deletePost(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        error: { message: `Post with ID ${id} not found` }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Post deleted successfully.' }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};