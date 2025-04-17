const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.conf");

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

// Save new payment
Payment.savePayment = async (data) => {
    return await Payment.create(data);
}

// Get payment details
Payment.getPaymentDetails = async (booking_id, user_id) => {
    return await Payment.findOne({
        attributes: ['payment_id', 'amount', 'method', 'status', 'reference', 'paid_at'],
        where: {
            booking_id,
            user_id
        }
    });
}

module.exports = Payment