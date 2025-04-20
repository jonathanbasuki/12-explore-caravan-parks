const express = require('express');
const router = express.Router();

const savedController = require('../controllers/Saved.controller');
const authAuthenticator = require('../middleware/authAuthenticator');

/**
 * @route POST /saved
 * @description Save a campsite to the user's saved list
 * @access Protected (requires authentication)
 */
router.post('/saved', authAuthenticator.authenticateUser, savedController.saveCampsite);

/**
 * @route GET /saved
 * @description Get a list of all saved campsites (optionally filtered by user or other logic in the controller)
 * @access Public or Protected (depends on controller logic)
 */
router.get('/saved', savedController.getAllSavedCampsites);

/**
 * @route GET /saved/:saved_id
 * @description Get details of a specific saved campsite by its saved ID
 * @param {string} saved_id - The ID of the saved campsite entry
 * @access Public or Protected
 */
router.get('/saved/:saved_id', savedController.getSavedDetail);

/**
 * @route DELETE /saved/:campground_id
 * @description Remove a saved campsite by its campground ID from the user's saved list
 * @param {string} campground_id - The ID of the campground to remove from saved list
 * @access Protected (requires authentication)
 */
router.delete('/saved/:campground_id', authAuthenticator.authenticateUser, savedController.removeSavedCampsite);

module.exports = router;
