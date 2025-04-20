const bookingService = require('../services/Booking.service');
const reviewService = require('../services/Review.service');
const savedService = require('../services/Saved.service');

// Dashboard page
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

}

// Booking history page
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
}

// Review history page
exports.renderReviewHistory = async (req, res) => {
    const reviews = await reviewService.getReviewHistory(req.user.id);

    res.render('pages/dashboard/review_history', {
        title: "Payment History",
        scripts: [],
        review_history: reviews
    });
}

// Booking history page
exports.renderWishlistPage = async (req, res) => {
    const wishlist = await savedService.getAllSavedCampgrounds(req.user.id);

    res.render('pages/dashboard/saved_campgrounds', {
        title: "Saved Campgrounds",
        scripts: [],
        saved_campgrounds: wishlist
    });
}