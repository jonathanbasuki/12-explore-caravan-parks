const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/Dashboard.controller');

const authAuthenticator = require('../middleware/authAuthenticator');

router.get('/dashboard', authAuthenticator.authenticateUser, dashboardController.renderDashboardPage);
router.get('/dashboard/booking-history', authAuthenticator.authenticateUser, dashboardController.renderBookingHistory);
router.get('/dashboard/payment-history', authAuthenticator.authenticateUser, dashboardController.renderPaymentHistory);
router.get('/dashboard/saved-campgrounds', authAuthenticator.authenticateUser, dashboardController.renderWishlistPage);

module.exports = router;