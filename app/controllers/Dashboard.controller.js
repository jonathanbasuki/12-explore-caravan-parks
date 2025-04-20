const bookingService = require('../services/Booking.service');
const reviewService = require('../services/Review.service');
const savedService = require('../services/Saved.service');

/**
 * Renders the dashboard page with the user's latest bookings, reviews, and saved campgrounds.
 * @param {Object} req - Express request object containing user ID in req.user
 * @param {Object} res - Express response object
 * @returns {void} Renders the dashboard page with user data or returns error response
 * @throws {Error} If fetching data from services fails
 */
exports.renderDashboardPage = async (req, res) => {
    try {
        const bookings = await bookingService.getLatestBookingsWithCampground(req.user.id);
        const reviews = await reviewService.getLatestReviewsWithCampground(req.user.id);
        const wishlist = await savedService.getLatestSavedCampgrounds(req.user.id);

        res.render('pages/dashboard/dashboard', {
            title: "Dashboard",
            booking_history: bookings,
            review_history: reviews,
            saved_history: wishlist,
            scripts: []
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

/**
 * Renders the booking history page for the logged-in user.
 * @param {Object} req - Express request object containing user ID in req.user
 * @param {Object} res - Express response object
 * @returns {void} Renders the booking history page with user's bookings or returns error response
 * @throws {Error} If fetching booking history fails
 */
exports.renderBookingHistory = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingHistory(req.user.id);

        res.render('pages/dashboard/booking_history', {
            title: "Booking History",
            scripts: [],
            booking_history: bookings
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

/**
 * Renders the review history page for the logged-in user.
 * @param {Object} req - Express request object containing user ID in req.user
 * @param {Object} res - Express response object
 * @returns {void} Renders the review history page with user's reviews
 * @throws {Error} If fetching review history fails
 */
exports.renderReviewHistory = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewHistory(req.user.id);

        res.render('pages/dashboard/review_history', {
            title: "Review History",
            scripts: [],
            review_history: reviews
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

/**
 * Renders the wishlist page with the logged-in user's saved campgrounds.
 * @param {Object} req - Express request object containing user ID in req.user
 * @param {Object} res - Express response object
 * @returns {void} Renders the saved campgrounds page with user's wishlist
 * @throws {Error} If fetching saved campgrounds fails
 */
exports.renderWishlistPage = async (req, res) => {
    try {
        const wishlist = await savedService.getAllSavedCampgrounds(req.user.id);

        res.render('pages/dashboard/saved_campgrounds', {
            title: "Saved Campgrounds",
            scripts: [],
            saved_campgrounds: wishlist
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};