const User = require('../models/User.model');

/**
 * Registers a new user.
 * @param {Object} req - Express request object containing user details in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with registered user data or error response
 * @throws {Error} If user creation fails
 */
exports.createUser = async (req, res) => {
    try {
        const user = await User.createUser(req.body);

        res.status(201).json({
            status: 201,
            message: 'User registered successfully!',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves all users.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with all users' data or error response
 * @throws {Error} If fetching users fails
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();

        res.status(200).json({
            status: 200,
            message: 'User data fetched successfully!',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves details of a specific user by ID.
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with user details or error response
 * @throws {Error} If fetching user details fails
 */
exports.getUserDetail = async (req, res) => {
    try {
        const user = await User.getUserDetail(req.params.user_id);

        if (!user) return res.status(404).json({
            status: 404,
            message: 'User not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'User details fetched successfully!',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Updates details of a specific user.
 * @param {Object} req - Express request object containing user ID in params and updated details in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with updated user data or error response
 * @throws {Error} If updating user details fails
 */
exports.updateUserDetail = async (req, res) => {
    try {
        const updatedUser = await User.updateUserDetail(req.params.user_id, req.body);

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found or no changes made.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'User detail updated successfully!',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Soft deletes a specific user by ID.
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with deleted user data or error response
 * @throws {Error} If soft deleting user fails
 */
exports.softDeleteUser = async (req, res) => {
    try {
        const deletedUser = await User.softDeleteUser(req.params.user_id);

        if (!deletedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'User data deleted successfully!',
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};