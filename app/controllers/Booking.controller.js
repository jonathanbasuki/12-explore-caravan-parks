const Booking = require('../models/Booking.model');

/**
 * Creates a new booking for a campground.
 * @param {Object} req - Express request object containing user ID and booking details (campground_id, checkin, checkout)
 * @param {Object} res - Express response object
 * @returns {void} Redirects to the campground page on success or returns error response
 * @throws {Error} If booking creation fails
 */
exports.createBooking = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { campground_id, checkin, checkout } = req.body;

        const booking = await Booking.createBooking({ user_id, campground_id, checkin, checkout });

        res.redirect(`/search/campground/${campground_id}`);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves all bookings for the logged-in user.
 * @param {Object} req - Express request object containing user ID in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with booking data or error response
 * @throws {Error} If fetching bookings fails
 */
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

/**
 * Retrieves details of a specific booking for the logged-in user.
 * @param {Object} req - Express request object containing booking ID in params and user ID in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with booking details or error response
 * @throws {Error} If fetching booking details fails
 */
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

/**
 * Updates a specific booking's details.
 * @param {Object} req - Express request object containing booking ID in params and updated details in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with updated booking data or error response
 * @throws {Error} If updating booking fails
 */
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

/**
 * Soft deletes a specific booking for the logged-in user.
 * @param {Object} req - Express request object containing booking ID in params and user ID in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with deleted booking data or error response
 * @throws {Error} If soft deletion fails
 */
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