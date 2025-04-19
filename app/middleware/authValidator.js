const { body } = require('express-validator');

exports.registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
        .trim()
        .isEmail().withMessage('Must be a valid email'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
];
