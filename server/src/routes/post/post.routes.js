const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const { createPost } = require('../../controllers/post/createPost.controller');
const { getFeed } = require('../../controllers/post/getFeed.controller');
const { getUserPosts } = require('../../controllers/post/getUserPosts.controller');
const { deletePost } = require('../../controllers/post/deletePost.controller');
const { likePost } = require('../../controllers/post/likePost.controller');
const { commentPost } = require('../../controllers/post/commentPost.controller');
const { savePost } = require('../../controllers/post/savePost.controller');
const { getComments } = require('../../controllers/post/getComments.controller');

// Feed (paginated)
router.get('/feed', getFeed);
// User's posts
router.get('/user/:userId', authMiddleware, getUserPosts);
// Create post
router.post('/', authMiddleware, createPost);
// Delete post
router.delete('/:postId', authMiddleware, deletePost);
// Like post
router.post('/:postId/like', authMiddleware, likePost);
// Comment on post
router.post('/:postId/comment', authMiddleware, commentPost);
// Save post
router.post('/:postId/save', authMiddleware, savePost);
// Get comments for a post
router.get('/:postId/comments', authMiddleware, getComments);

module.exports = router;
