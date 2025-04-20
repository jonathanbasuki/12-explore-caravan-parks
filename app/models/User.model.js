/**
 * @fileoverview Sequelize User model and related user account methods.
 * Handles user creation, authentication lookup, soft deletion, and profile management.
 */

const bcrypt = require('bcryptjs');
const { DataTypes, Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/db.conf');

/**
 * Sequelize model for User.
 * 
 * @typedef {Object} User
 * @property {string} user_id - Unique user identifier (UUID)
 * @property {string} username - Unique username
 * @property {string} email - Unique email address
 * @property {string} password_hash - Hashed password
 * @property {Date} created_at - Account creation timestamp
 * @property {Date} updated_at - Last update timestamp
 * @property {Date|null} deleted_at - Timestamp of soft deletion (null if active)
 */
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
});

/**
 * Create a new user with hashed password.
 * 
 * @async
 * @function
 * @param {Object} data
 * @param {string} data.username - Desired username
 * @param {string} data.email - User email
 * @param {string} data.password - Plain-text password
 * @returns {Promise<User>} Newly created user
 */
User.createUser = async ({ username, email, password }) => {
    const userId = uuidv4();
    const hashed = await bcrypt.hash(password, 10);
    return User.create({ user_id: userId, username, email, password_hash: hashed });
};

/**
 * Find a user by email or username (used for login or checking availability).
 * 
 * @async
 * @function
 * @param {string} identifier - Email or username
 * @returns {Promise<User|null>} User if found, otherwise null
 */
User.getUserByEmailOrUsername = async (identifier) => {
    return await User.findOne({
        where: {
            [Op.or]: [
                { email: identifier },
                { username: identifier }
            ]
        }
    });
};

/**
 * Get a list of all active (non-deleted) users.
 * 
 * @async
 * @function
 * @returns {Promise<User[]>} Array of user data
 */
User.getAllUsers = async () => {
    return await User.findAll({
        attributes: ['user_id', 'username', 'email', 'created_at'],
        where: {
            deleted_at: null
        }
    });
};

/**
 * Get detailed information of a specific user (non-deleted).
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<User|null>} User detail if found, otherwise null
 */
User.getUserDetail = async (user_id) => {
    return await User.findOne({
        attributes: ['user_id', 'username', 'email', 'created_at'],
        where: {
            user_id,
            deleted_at: null
        }
    });
};

/**
 * Update user profile details (only if user is not deleted).
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @param {Object} data - Fields to update (e.g., username, email)
 * @returns {Promise<Object|null>} Updated user with update timestamp, or null if update failed
 */
User.updateUserDetail = async (user_id, data) => {
    const [updated] = await User.update(data, {
        where: {
            user_id,
            deleted_at: null
        }
    });

    if (!updated) return null;

    return await User.findByPk(user_id, {
        attributes: ['user_id', 'updated_at']
    });
};

/**
 * Soft delete a user (set `deleted_at` without removing the record).
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user to delete
 * @returns {Promise<Object|null>} Deleted user with deletion timestamp, or null if failed
 */
User.softDeleteUser = async (user_id) => {
    const updated = await User.update(
        { deleted_at: new Date() },
        {
            where: {
                user_id,
                deleted_at: null
            }
        }
    );

    if (!updated) return null;

    return await User.findByPk(user_id, {
        attributes: ['user_id', 'deleted_at']
    });
};

module.exports = User;
