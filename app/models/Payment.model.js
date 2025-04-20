/**
 * @fileoverview Payment model definition and custom methods for handling payment data.
 * Implements Sequelize ORM to interact with the 'payments' table in the database.
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.conf");

/**
 * Sequelize model for Payment.
 * 
 * @typedef {Object} Payment
 * @property {string} payment_id - Primary key, unique ID for each payment
 * @property {string} user_id - ID of the user who made the payment
 * @property {string} booking_id - ID of the associated booking
 * @property {number} amount - Amount of the payment
 * @property {'Midtrans'|'Xendit'|'Transfer'} method - Payment method
 * @property {'Pending'|'Paid'|'Failed'} status - Payment status
 * @property {string} reference - Reference code or transaction details from gateway
 * @property {Date} paid_at - Date and time when the payment was completed
 * @property {Date} created_at - Timestamp when the payment was created
 * @property {Date} updated_at - Timestamp when the payment was last updated
 * @property {Date|null} deleted_at - Timestamp if the payment is soft deleted
 */
const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    booking_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    method: {
        type: DataTypes.ENUM('Midtrans', 'Xendit', 'Transfer'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed'),
        defaultValue: 'Pending',
    },
    reference: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
});

/**
 * Save a new payment record to the database.
 * 
 * @async
 * @function
 * @param {Object} data - Data to be saved
 * @param {string} data.payment_id - Unique payment ID
 * @param {string} data.user_id - ID of the user
 * @param {string} data.booking_id - Related booking ID
 * @param {number} data.amount - Payment amount
 * @param {'Midtrans'|'Xendit'|'Transfer'} data.method - Payment method
 * @param {'Pending'|'Paid'|'Failed'} [data.status] - Payment status (default is 'Pending')
 * @param {string} data.reference - Transaction reference
 * @param {Date} data.paid_at - Date and time of payment
 * @returns {Promise<Payment>} The created Payment instance
 */
Payment.savePayment = async (data) => {
    return await Payment.create(data);
};

/**
 * Get the payment details for a specific booking and user.
 * 
 * @async
 * @function
 * @param {string} booking_id - ID of the related booking
 * @param {string} user_id - ID of the user
 * @returns {Promise<Payment|null>} Payment details if found, otherwise null
 */
Payment.getPaymentDetails = async (booking_id, user_id) => {
    return await Payment.findOne({
        attributes: ['payment_id', 'amount', 'method', 'status', 'reference', 'paid_at'],
        where: {
            booking_id,
            user_id
        }
    });
};

module.exports = Payment;
