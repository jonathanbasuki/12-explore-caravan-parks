const express = require('express');
const router = express.Router();

const userController = require('../controllers/User.controller');

/**
 * @route GET /users
 * @description Get a list of all users
 * @access Public or Protected (depending on your auth setup)
 */
router.get('/users', userController.getAllUsers);

/**
 * @route GET /users/:user_id
 * @description Get details of a specific user by user ID
 * @param {string} user_id - The ID of the user
 * @access Public or Protected
 */
router.get('/users/:user_id', userController.getUserDetail);

/**
 * @route POST /users
 * @description Create a new user
 * @access Public or Protected
 */
router.post('/users', userController.createUser);

/**
 * @route PUT /users/:user_id
 * @description Update the details of a specific user
 * @param {string} user_id - The ID of the user
 * @access Protected
 */
router.put('/users/:user_id', userController.updateUserDetail);

/**
 * @route PUT /users/:user_id/delete
 * @description Soft delete a user (e.g., mark as inactive instead of removing)
 * @param {string} user_id - The ID of the user
 * @access Protected
 */
router.put('/users/:user_id/delete', userController.softDeleteUser);

module.exports = router;
