const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/Booking.controller');

router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:booking_id', bookingController.getBookingDetail);
router.put('/bookings/:booking_id', bookingController.updateBooking);
router.delete('/bookings/:booking_id', bookingController.softDeleteBooking);

module.exports = router;