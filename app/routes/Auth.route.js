const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const authController = require('../controllers/Auth.controller');
const userController = require('../controllers/User.controller');

const authValidation = require('../middleware/authValidator');
const authAuthenticator = require('../middleware/authAuthenticator');

router.get('/login', authAuthenticator.redirectIfAuthenticated, authController.renderLoginPage);
router.post('/login', authController.validateLogin);

router.get('/register', authAuthenticator.redirectIfAuthenticated, authController.renderRegisterPage);
router.post('/register', authValidation.registerValidation,
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Return validation errors as JSON
            return res.status(422).json({
                status: 422,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        next();
    },
    userController.createUser
);

router.get('/forgot-password', authAuthenticator.redirectIfAuthenticated, authController.renderForgotPage);

router.get('/logout', authController.logout);

module.exports = router;