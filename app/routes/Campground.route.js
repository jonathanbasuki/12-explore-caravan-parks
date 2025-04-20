const express = require('express');
const router = express.Router();

const campgroundController = require('../controllers/Campground.controller');

/**
 * @route GET /api/campgrounds
 * @description Fetch a list of campgrounds (can be filtered based on query params inside controller)
 * @access Public
 */
router.get('/api/campgrounds', campgroundController.fetchCampgrounds);

/**
 * @route GET /api/campgrounds/:campground_id
 * @description Fetch detailed information about a specific campground using its ID
 * @param {string} campground_id - The ID of the campground to fetch details for
 * @access Public
 */
router.get('/api/campgrounds/:campground_id', campgroundController.getCampgroundDetail);

module.exports = router;
