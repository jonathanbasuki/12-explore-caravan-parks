const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/Booking.controller');
const authAuthenticator = require('../middleware/authAuthenticator');

/**
 * @route POST /bookings
 * @description Create a new booking for a user
 * @access Protected (requires authentication)
 */
router.post('/bookings', authAuthenticator.authenticateUser, bookingController.createBooking);

/**
 * @route GET /bookings
 * @description Fetch all bookings for the authenticated user
 * @access Protected (requires authentication)
 */
router.get('/bookings', authAuthenticator.authenticateUser, bookingController.getAllBookings);

/**
 * @route GET /bookings/:booking_id
 * @description Fetch detailed information about a specific booking
 * @param {string} booking_id - The ID of the booking to fetch details for
 * @access Protected (requires authentication)
 */
router.get('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.getBookingDetail);

/**
 * @route PUT /bookings/:booking_id
 * @description Update the details of an existing booking
 * @param {string} booking_id - The ID of the booking to update
 * @access Protected (requires authentication)
 */
router.put('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.updateBooking);

/**
 * @route DELETE /bookings/:booking_id
 * @description Soft delete a specific booking (mark as deleted, but not physically remove it)
 * @param {string} booking_id - The ID of the booking to delete
 * @access Protected (requires authentication)
 */
router.delete('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.softDeleteBooking);

module.exports = router;
