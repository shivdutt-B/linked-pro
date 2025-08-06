const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../../controllers/profile/profile.controller');

// GET /api/profile/:userId
router.get('/:userId', getUserProfile);

module.exports = router;
