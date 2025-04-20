const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/Booking.controller');

const authAuthenticator = require('../middleware/authAuthenticator');

router.post('/bookings', authAuthenticator.authenticateUser, bookingController.createBooking);
router.get('/bookings', authAuthenticator.authenticateUser, bookingController.getAllBookings);
router.get('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.getBookingDetail);
router.put('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.updateBooking);
router.delete('/bookings/:booking_id', authAuthenticator.authenticateUser, bookingController.softDeleteBooking);

module.exports = router;