const express = require('express');
const router = express.Router();

const authController = require('../controllers/Auth.controller');

router.get('/login', authController.renderLoginPage);

module.exports = router;