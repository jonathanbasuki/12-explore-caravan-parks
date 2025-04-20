const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/Dashboard.controller');
const authAuthenticator = require('../middleware/authAuthenticator');

/**
 * @route GET /dashboard
 * @description Render the user dashboard page (home for user after login)
 * @access Protected (requires authentication)
 */
router.get('/dashboard', authAuthenticator.authenticateUser, dashboardController.renderDashboardPage);

/**
 * @route GET /dashboard/booking-history
 * @description Render the user's booking history page
 * @access Protected (requires authentication)
 */
router.get('/dashboard/booking-history', authAuthenticator.authenticateUser, dashboardController.renderBookingHistory);

/**
 * @route GET /dashboard/review-history
 * @description Render the user's review history page
 * @access Protected (requires authentication)
 */
router.get('/dashboard/review-history', authAuthenticator.authenticateUser, dashboardController.renderReviewHistory);

/**
 * @route GET /dashboard/saved-campgrounds
 * @description Render the user's saved campgrounds/wishlist page
 * @access Protected (requires authentication)
 */
router.get('/dashboard/saved-campgrounds', authAuthenticator.authenticateUser, dashboardController.renderWishlistPage);

module.exports = router;
