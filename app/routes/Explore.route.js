const express = require('express');
const router = express.Router();

const exploreController = require('../controllers/Explore.controller');

/**
 * @route GET /explore
 * @description Render the explore page (may show various campgrounds or search options)
 * @access Public
 */
router.get('/explore', exploreController.renderExplorePage);

/**
 * @route GET /search
 * @description Render the search results page (shows results based on search query)
 * @access Public
 */
router.get('/search', exploreController.renderResultPage);

/**
 * @route GET /search/campground/:campground_id
 * @description Render the detail page for a specific campground
 * @param {string} campground_id - The ID of the campground to show details for
 * @access Public
 */
router.get('/search/campground/:campground_id', exploreController.renderDetailPage);

module.exports = router;
