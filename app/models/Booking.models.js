const { DataTypes } = require('sequelize');
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
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'bookings'
});

// Create a new booking
Booking.createBooking = async (data) => {
    return await Booking.create(data);
};

// Get all bookings
Booking.getAllBookings = async () => {
    return await Booking.findAll({
        attributes: ['booking_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
        where: { deleted_at: null }
    });
};

// Get booking by ID
Booking.getBookingDetail = async (booking_id) => {
    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'check_in', 'check_out', 'status', 'created_at', 'updated_at'],
    });
};

// Update booking
Booking.updateBooking = async (booking_id, data) => {
    const [updated] = await Booking.update(data, {
        where: { booking_id }
    });

    if (!updated) return null;

    // Fetch and return the updated booking details
    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'updated_at']
    });
};


// Soft delete booking
Booking.softDeleteBooking = async (booking_id) => {
    const updated = await Booking.update(
        { deleted_at: new Date() },
        { where: { booking_id } }
    );

    if (!updated) return null;

    return await Booking.findByPk(booking_id, {
        attributes: ['booking_id', 'deleted_at']
    });
};

module.exports = Booking;