const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/Review.controller');
const authAuthenticator = require('../middleware/authAuthenticator');

/**
 * @route POST /reviews
 * @description Add a new review to a campground
 * @access Protected (requires authentication)
 */
router.post('/reviews', authAuthenticator.authenticateUser, reviewController.addCampgroundReview);

/**
 * @route GET /reviews
 * @description Get all campground reviews (can be filtered based on query params inside controller)
 * @access Public
 */
router.get('/reviews', reviewController.getCampgroundReview);

/**
 * @route PUT /reviews/:review_id
 * @description Update a specific campground review by its review ID
 * @param {string} review_id - The ID of the review to update
 * @access Public or Protected (depending on logic; usually should be protected and checked against user ownership)
 */
router.put('/reviews/:review_id', reviewController.updateCampgroundReview);

/**
 * @route DELETE /reviews/:review_id
 * @description Delete a specific campground review by its review ID
 * @param {string} review_id - The ID of the review to delete
 * @access Public or Protected (depending on logic; typically should be protected)
 */
router.delete('/reviews/:review_id', reviewController.deleteCampgroundReview);

module.exports = router;
