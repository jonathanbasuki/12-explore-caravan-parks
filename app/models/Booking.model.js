const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../config/db.conf');

const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: {
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

// Create a new booking
Booking.createBooking = async ({ user_id, checkin, checkout }) => {
    const bookingId = uuidv4();

    return await Booking.create({
        booking_id: bookingId,
        user_id,
        check_in: checkin,
        check_out: checkout
    });
};

// Get all bookings
Booking.getAllBookings = async (user) => {
    return await Booking.findAll({
        attributes: ['booking_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
        where: {
            user_id: user,
            deleted_at: null
        }
    });
};

// Get booking detail
Booking.getBookingDetail = async (booking_id, user) => {
    return await Booking.findOne({
        attributes: ['booking_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
        where: {
            booking_id,
            user_id: user
        }
    });
};

// Update booking
Booking.updateBooking = async (booking_id, data) => {
    const [updated] = await Booking.update(data, {
        where: {
            booking_id,
            user_id: data.user_id
        }
    });

    if (!updated) return null;

    // Fetch and return the updated booking details
    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'updated_at']
    });
};


// Soft delete booking
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