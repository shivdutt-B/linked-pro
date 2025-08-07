const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const { sendRequest } = require('../../controllers/connections/sendRequest.controller');
const { acceptRequest } = require('../../controllers/connections/acceptRequest.controller');
const { rejectRequest } = require('../../controllers/connections/rejectRequest.controller');
const { cancelRequest } = require('../../controllers/connections/cancelRequest.controller');
const { disconnect } = require('../../controllers/connections/disconnect.controller');
const { getRequests } = require('../../controllers/connections/getRequests.controller');
const { getConnections } = require('../../controllers/connections/getConnections.controller');

// Send connection request
router.post('/request', authMiddleware, sendRequest);
// Accept connection request
router.post('/accept', authMiddleware, acceptRequest);
// Reject connection request
router.post('/reject', authMiddleware, rejectRequest);
// Cancel sent request
router.post('/cancel', authMiddleware, cancelRequest);
// Disconnect
router.post('/disconnect', authMiddleware, disconnect);
// Get pending requests for user
router.get('/requests', authMiddleware, getRequests);
// Get all connections for user
router.get('/all', authMiddleware, getConnections);

module.exports = router;
