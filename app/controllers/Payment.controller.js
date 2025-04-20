const Payment = require('../models/Payment.model');

/**
 * Saves a new payment record.
 * @param {Object} req - Express request object containing payment details in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with saved payment data or error response
 * @throws {Error} If saving payment fails
 */
exports.savePayment = async (req, res) => {
    try {
        const payment = await Payment.savePayment(req.body);

        res.status(201).json({
            status: 201,
            message: 'Payment saved successfully!',
            data: payment
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves details of a specific payment for a booking.
 * @param {Object} req - Express request object containing booking ID in params and user ID in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with payment details or error response
 * @throws {Error} If fetching payment details fails
 */
exports.getPaymentDetails = async (req, res) => {
    try {
        const payment = await Payment.getPaymentDetails(req.params.booking_id, req.body.user_id);

        res.status(201).json({
            status: 201,
            message: 'Payment details fetched successfully!',
            data: payment
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};