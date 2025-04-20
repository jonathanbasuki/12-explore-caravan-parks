const { body } = require('express-validator');

/**
 * Validation rules for user registration.
 * Uses express-validator to ensure username, email, password, and password confirmation are valid.
 *
 * @constant
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @description
 * - `username` must not be empty and must be at least 3 characters long.
 * - `email` must be a valid email format.
 * - `password` must be at least 8 characters long.
 * - `confirmPassword` must match the `password` field.
 */
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
