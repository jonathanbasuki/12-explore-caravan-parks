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
        })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

}

// Booking history page
exports.renderBookingHistory = (req, res) => {
    res.render('pages/dashboard/booking_history', {
        title: "Booking History",
        scripts: [],
        bookings: [
            {
                place: 'Mountain View Camp',
                location: 'California, USA',
                image: '/images/hero.jpg',
                checkIn: '2025-04-01',
                checkOut: '2025-04-03',
                status: 'Completed',
            },
            // more bookings...
        ]
    })
}

// Payment history page
exports.renderPaymentHistory = (req, res) => {
    res.render('pages/dashboard/payment_history', {
        title: "Payment History",
        scripts: [],
        payments: [
            {
                place: 'Forest Hills Camp',
                location: 'Oregon, USA',
                amount: 240.00,
                date: '2025-03-18',
                method: 'Credit Card',
                status: 'Paid',
                transactionId: 'TXN123456789',
            },
            // more entries...
        ]
    })
}

// Booking history page
exports.renderWishlistPage = (req, res) => {
    res.render('pages/dashboard/saved_campgrounds', {
        title: "Saved Campgrounds",
        scripts: []
    })
}