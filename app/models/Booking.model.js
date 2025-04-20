/**
 * @fileoverview Booking model definition and custom static methods for booking operations.
 * Uses Sequelize ORM for defining schema and interactions with the 'bookings' table.
 */

const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/db.conf');
const { getCampgroundDetail } = require('../services/Campground.service');

/**
 * Sequelize model for Booking.
 * 
 * @typedef {Object} Booking
 * @property {string} booking_id - Primary key, unique ID for each booking
 * @property {string} user_id - ID of the user who made the booking
 * @property {string} campground_id - ID of the booked campground
 * @property {Date} check_in - Check-in date
 * @property {Date} check_out - Check-out date
 * @property {'Pending'|'Confirmed'|'Canceled'|'Completed'|'Rejected'} status - Booking status
 * @property {Date} created_at - Timestamp when the booking was created
 * @property {Date} updated_at - Timestamp when the booking was last updated
 * @property {Date|null} deleted_at - Timestamp if the booking is soft deleted
 */
const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    campground_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check_in: {
        type: DataTypes.DATE,
        allowNull: false
    },
    check_out: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Canceled', 'Completed', 'Rejected'),
        defaultValue: 'Pending'
    },
}, {
    tableName: 'bookings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

/**
 * Check if a user has already made a booking for a campground.
 *
 * @async
 * @function
 * @param {Object} params
 * @param {string} params.user_id - ID of the user
 * @param {string} params.campground_id - ID of the campground
 * @returns {Promise<Booking|null>} Booking instance if found, else null
 */
Booking.checkBookingByUser = async ({ user_id, campground_id }) => {
    return await Booking.findOne({
        attributes: ['booking_id', 'campground_id', 'check_in', 'check_out', 'status', 'created_at'],
        where: {
            user_id,
            campground_id
        }
    });
};

/**
 * Create a new booking for a user.
 *
 * @async
 * @function
 * @param {Object} params
 * @param {string} params.user_id - ID of the user
 * @param {string} params.campground_id - ID of the campground
 * @param {Date} params.checkin - Check-in date
 * @param {Date} params.checkout - Check-out date
 * @returns {Promise<Booking>} The newly created booking
 */
Booking.createBooking = async ({ user_id, campground_id, checkin, checkout }) => {
    const bookingId = uuidv4();
    return await Booking.create({
        booking_id: bookingId,
        user_id,
        campground_id,
        check_in: checkin,
        check_out: checkout
    });
};

/**
 * Get the 5 most recent bookings for a user.
 *
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Booking[]>} Array of Booking instances
 */
Booking.getLatestBooking = async (user_id) => {
    return await Booking.findAll({
        attributes: ['booking_id', 'campground_id', 'check_in'],
        where: {
            user_id,
            deleted_at: null
        },
        order: [['check_in', 'DESC']],
        limit: 5,
    });
};

/**
 * Get full booking history for a user.
 *
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Booking[]>} Array of Booking instances
 */
Booking.getBookingHistory = async (user_id) => {
    return await Booking.findAll({
        attributes: ['booking_id', 'campground_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
        where: {
            user_id,
            deleted_at: null
        },
        order: [['check_in', 'DESC']],
    });
};

/**
 * Get detailed information about a specific booking.
 *
 * @async
 * @function
 * @param {string} booking_id - ID of the booking
 * @param {string} user - ID of the user (to ensure ownership)
 * @returns {Promise<Booking|null>} Booking instance if found, else null
 */
Booking.getBookingDetail = async (booking_id, user) => {
    return await Booking.findOne({
        attributes: ['booking_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
        where: {
            booking_id,
            user_id: user
        }
    });
};

/**
 * Update an existing booking with new data.
 *
 * @async
 * @function
 * @param {string} booking_id - ID of the booking
 * @param {Object} data - Object containing updated fields and user_id
 * @returns {Promise<Booking|null>} Updated booking instance or null if not found
 */
Booking.updateBooking = async (booking_id, data) => {
    const [updated] = await Booking.update(data, {
        where: {
            booking_id,
            user_id: data.user_id
        }
    });

    if (!updated) return null;

    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'updated_at']
    });
};

/**
 * Soft delete a booking by setting `deleted_at`.
 *
 * @async
 * @function
 * @param {string} booking_id - ID of the booking
 * @param {string} user - ID of the user requesting deletion
 * @returns {Promise<Booking|null>} Deleted booking info or null if not found
 */
Booking.softDeleteBooking = async (booking_id, user) => {
    const booking = await Booking.findOne({
        where: {
            booking_id,
            user_id: user
        }
    });

    if (!booking) return null;

    await booking.destroy();

    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'deleted_at']
    });
};

module.exports = Booking;
