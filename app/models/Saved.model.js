/**
 * @fileoverview Saved model definition and related methods for saving campgrounds.
 * Uses Sequelize ORM to interact with the 'saved_campgrounds' table.
 */

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../config/db.conf");

/**
 * Sequelize model for Saved campgrounds.
 * 
 * @typedef {Object} Saved
 * @property {string} saved_id - Primary key, unique ID for each saved record
 * @property {string} user_id - ID of the user who saved the campground
 * @property {string} campground_id - ID of the saved campground
 * @property {Date} created_at - Timestamp when the campground was saved
 */
const Saved = sequelize.define('Saved', {
    saved_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    campground_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'saved_campgrounds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false
});

/**
 * Check if a specific campground is already saved by a user.
 * 
 * @async
 * @function
 * @param {Object} data
 * @param {string} data.user_id - ID of the user
 * @param {string} data.campground_id - ID of the campground
 * @returns {Promise<Saved|null>} Saved record or null if not found
 */
Saved.checkSavedByUser = async ({ user_id, campground_id }) => {
    return await Saved.findOne({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: {
            user_id,
            campground_id
        }
    });
};

/**
 * Save a new campground for the user.
 * 
 * @async
 * @function
 * @param {Object} data
 * @param {string} data.user_id - ID of the user
 * @param {string} data.campground_id - ID of the campground
 * @returns {Promise<Saved>} The newly saved record
 */
Saved.saveCampsite = async ({ user_id, campground_id }) => {
    const savedId = uuidv4();

    return await Saved.create({
        saved_id: savedId,
        user_id,
        campground_id
    });
};

/**
 * Get the 5 most recent saved campgrounds by a user.
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Saved[]>} List of recent saved campgrounds
 */
Saved.getLatestSaved = async (user_id) => {
    return await Saved.findAll({
        attributes: ['saved_id', 'campground_id'],
        where: { user_id },
        order: [['created_at', 'DESC']],
        limit: 5,
    });
};

/**
 * Get all saved campgrounds for a specific user.
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Saved[]>} List of all saved campgrounds
 */
Saved.getAllSavedCampgrounds = async (user_id) => {
    return await Saved.findAll({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: { user_id },
        order: [['created_at', 'DESC']],
    });
};

/**
 * Get detailed info of a specific saved campground for a user.
 * 
 * @async
 * @function
 * @param {string} saved_id - ID of the saved record
 * @param {string} user - ID of the user
 * @returns {Promise<Saved|null>} Saved record detail or null if not found
 */
Saved.getSavedDetail = async (saved_id, user) => {
    return await Saved.findOne({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: {
            saved_id,
            user_id: user
        }
    });
};

/**
 * Remove a saved campground (hard delete).
 * 
 * @async
 * @function
 * @param {Object} data
 * @param {string} data.user_id - ID of the user
 * @param {string} data.campground_id - ID of the campground
 * @returns {Promise<number>} Number of records deleted (0 or 1)
 */
Saved.removeSavedCampsite = async ({ user_id, campground_id }) => {
    return await Saved.destroy({
        where: {
            user_id,
            campground_id
        }
    });
};

module.exports = Saved;
