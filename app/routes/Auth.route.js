const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const authController = require('../controllers/Auth.controller');
const userController = require('../controllers/User.controller');

const rateLimit = require('../middleware/rateLimit');
const authValidation = require('../middleware/authValidator');
const authAuthenticator = require('../middleware/authAuthenticator');

/**
 * @route GET /login
 * @description Render the login page for users who are not authenticated
 * @access Public (if not authenticated)
 */
router.get('/login', authAuthenticator.redirectIfAuthenticated, authController.renderLoginPage);

/**
 * @route POST /login
 * @description Handle user login submission and validation
 * @access Public
 */
router.post('/login', rateLimit.loginLimiter, authController.validateLogin);

/**
 * @route GET /register
 * @description Render the registration page for users who are not authenticated
 * @access Public (if not authenticated)
 */
router.get('/register', authAuthenticator.redirectIfAuthenticated, authController.renderRegisterPage);

/**
 * @route POST /register
 * @description Handle user registration, validate input, and create a new user
 * @param {string} username - The user's chosen username
 * @param {string} email - The user's email address
 * @param {string} password - The user's chosen password
 * @param {string} confirmPassword - The password confirmation field
 * @access Public
 */
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

/**
 * @route GET /forgot-password
 * @description Render the forgot password page for users who are not authenticated
 * @access Public (if not authenticated)
 */
router.get('/forgot-password', authAuthenticator.redirectIfAuthenticated, authController.renderForgotPage);

/**
 * @route GET /logout
 * @description Log the user out by clearing their session or authentication token
 * @access Protected (authenticated users only)
 */
router.get('/logout', authController.logout);

module.exports = router;
