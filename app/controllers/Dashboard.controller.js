// Dashboard page
exports.renderDashboardPage = (req, res) => {
    res.render('pages/dashboard/dashboard', {
        title: "Dashboard",
        scripts: []
    })
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