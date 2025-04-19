const express = require('express');
const router = express.Router();

const savedController = require('../controllers/Saved.controller');

const authAuthenticator = require('../middleware/authAuthenticator');

router.post('/saved', authAuthenticator.authenticateUser, savedController.saveCampsite);

router.get('/saved', savedController.getAllSavedCampsites);
router.get('/saved/:saved_id', savedController.getSavedDetail);
router.delete('/saved/:campground_id', authAuthenticator.authenticateUser, savedController.removeSavedCampsite);

module.exports = router;