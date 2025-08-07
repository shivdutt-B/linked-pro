const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../../controllers/profile/profile.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { editAbout } = require('../../controllers/profile/editAbout.controller');
const { editEducation, addEducation } = require('../../controllers/profile/editEducation.controller');
const { editExperience, addExperience } = require('../../controllers/profile/editExperience.controller');
const { editSkill, addSkill } = require('../../controllers/profile/editSkill.controller');
const { suggestedUsers } = require('../../controllers/profile/suggestedUsers.controller');

// GET /api/profile/:userId
router.get('/:userId', getUserProfile);

// About
router.put('/about/:userId', authMiddleware, editAbout);

// Education
router.put('/education/:userId', authMiddleware, editEducation);
router.post('/education/:userId', authMiddleware, addEducation);

// Experience
router.put('/experience/:userId', authMiddleware, editExperience);
router.post('/experience/:userId', authMiddleware, addExperience);

// Skill
router.put('/skill/:userId', authMiddleware, editSkill);
router.post('/skill/:userId', authMiddleware, addSkill);

// Suggested users
router.get('/suggested', authMiddleware, suggestedUsers);

module.exports = router;
