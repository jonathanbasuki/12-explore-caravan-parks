const User = require('../models/User.model');

// Register new user
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
}

// Get all users
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
}

// Get user detail
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
}

// Update user detail
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
}

// Soft delete user
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
}
