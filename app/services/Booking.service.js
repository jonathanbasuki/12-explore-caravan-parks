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

exports.getBookingHistory = async (user_id) => {
    const bookings = await Booking.getBookingHistory(user_id);

    const results = await Promise.all(bookings.map(async (booking) => {
        const campground = await campgroundService.getCampgroundDetail(booking.campground_id);

        return {
            booking_id: booking.booking_id,
            campground_id: booking.campground_id,
            campground_name: campground?.name || 'Unknown',
            campground_image: campground.media_urls[0] || '/images/hero.jpg',
            campground_address: campground.address,
            check_in: booking.check_in,
            check_out: booking.check_out,
            status: booking.status,
            created_at: booking.created_at,
            updated_at: booking.updated_at,
        };
    }));

    return results;
};
