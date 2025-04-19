const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

// Login page route
exports.renderLoginPage = (req, res) => {
    res.render('pages/auth/login', {
        title: "Login",
        error: null,
        scripts: []
    });
}

// Validate user login 
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

        // Simpan token ke cookie (opsional)
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

// Register page route
exports.renderRegisterPage = (req, res) => {
    res.render('pages/auth/register', {
        title: 'Register',
        scripts: ['/js/auth/register.js']
    });
}

// Forgot password page route
exports.renderForgotPage = (req, res) => {
    res.render('pages/auth/forgot_password', {
        title: "Forgot Password",
        scripts: []
    });
}

// Handle user logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};