const Booking = require('../models/Booking.model');
const campgroundService = require('./Campground.service');

exports.getLatestBookingsWithCampground = async (user_id) => {
    const bookings = await Booking.getLatestBooking(user_id);

    const results = await Promise.all(bookings.map(async (booking) => {
        const campground = await campgroundService.getCampgroundDetail(booking.campground_id);

        return {
            booking_id: booking.booking_id,
            campground_id: booking.campground_id,
            campground_name: campground?.name || 'Unknown',
            check_in: booking.check_in
        };
    }));

    return results;
};
