const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

/**
 * Renders the login page.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the login page with flash messages if applicable
 */
exports.renderLoginPage = (req, res) => {
    if (req.query.flash === 'registered') {
        req.flash('success_msg', 'User registered successfully!');
        return res.redirect('/login');
    }

    if (req.query.flash === 'failed') {
        req.flash('error_msg', 'Something went wrong. Please try again.');
        return res.redirect('/login');
    }

    res.render('pages/auth/login', {
        title: "Login",
        error: null,
        scripts: ['/js/partials/flash_message.js']
    });
}

/**
 * Validates user login credentials and issues a JWT token upon success.
 * @param {Object} req - Express request object containing identifier and password
 * @param {Object} res - Express response object
 * @returns {void} Renders login page with error or redirects to dashboard
 * @throws {Error} If database query or bcrypt comparison fails
 */
exports.validateLogin = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.getUserByEmailOrUsername(identifier);

        if (!user) {
            return res.render('pages/auth/login', {
                title: 'Login',
                error: 'Credentials not found.',
                scripts: []
            });
        }

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.render('pages/auth/login', {
                title: 'Login',
                error: 'Invalid credentials. Please try again.',
                scripts: []
            });
        }

        const token = jwt.sign({
            id: user.user_id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        res.render('pages/auth/login', {
            title: 'Login',
            error: 'Something went wrong. Please check your credentials.',
            scripts: []
        });
    }
};

/**
 * Renders the registration page.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the registration page with flash message if applicable
 */
exports.renderRegisterPage = (req, res) => {
    if (req.query.flash === 'failed') {
        req.flash('error_msg', 'Something went wrong. Please try again.');
        return res.redirect('/register');
    }

    res.render('pages/auth/register', {
        title: 'Register',
        scripts: [
            '/js/auth/register.js',
            '/js/partials/flash_message.js'
        ]
    });
}

/**
 * Renders the forgot password page.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the forgot password page
 */
exports.renderForgotPage = (req, res) => {
    res.render('pages/auth/forgot_password', {
        title: "Forgot Password",
        scripts: []
    });
}

/**
 * Handles user logout by clearing the JWT cookie and setting a flash message.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Clears token cookie and redirects to login page
 */
exports.logout = (req, res) => {
    req.flash('success_msg', 'Logout berhasil!');
    res.clearCookie('token');
    res.redirect('/login');
};