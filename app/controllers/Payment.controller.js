const Payment = require('../models/Payment.model');

// Save new payment
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
}

// Get specific payment details
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