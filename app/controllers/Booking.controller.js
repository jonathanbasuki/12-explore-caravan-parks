const Booking = require('../models/Booking.model');

// Create new booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.createBooking(req.body);

        res.status(201).json({
            status: 201,
            message: 'Booking data created successfully!',
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

// Get user (logged in) booking data
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAllBookings(req.body.user_id);

        res.status(200).json({
            status: 200,
            message: 'Booking data fetched successfully!',
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

// Get user (logged in) booking detail 
exports.getBookingDetail = async (req, res) => {
    try {
        const booking = await Booking.getBookingDetail(req.params.booking_id, req.body.user_id);

        if (!booking) return res.status(404).json({
            status: 404,
            message: 'Booking detail not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'Booking detail fetched successfully!',
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.updateBooking(req.params.booking_id, req.body);

        if (!updatedBooking) {
            return res.status(404).json({
                status: 404,
                message: 'Booking detail not found or no changes made.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Booking detail updated successfully!',
            data: updatedBooking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};


exports.softDeleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.softDeleteBooking(req.params.booking_id, req.body.user_id);

        if (!deletedBooking) {
            return res.status(404).json({
                status: 404,
                message: 'Booking not found or already deleted.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Booking data deleted successfully!',
            data: deletedBooking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};
