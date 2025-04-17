const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/Payment.controller');

router.post('/payments', paymentController.savePayment);
router.get('/payments/:booking_id', paymentController.getPaymentDetails);

module.exports = router;