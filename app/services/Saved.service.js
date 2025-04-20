/**
 * @fileoverview Service to retrieve saved campgrounds for a user,
 * enriching data with campground details from external API.
 */

const Saved = require('../models/Saved.model');
const campgroundService = require('./Campground.service');

/**
 * Get the most recent saved campgrounds for a specific user.
 *
 * @async
 * @function
 * @param {string} user_id - Unique identifier of the user.
 * @returns {Promise<Object[]>} Array of latest saved campground details.
 */
exports.getLatestSavedCampgrounds = async (user_id) => {
    const savedItems = await Saved.getLatestSaved(user_id);

    const results = await Promise.all(savedItems.map(async (saved) => {
        const campground = await campgroundService.getCampgroundDetail(saved.campground_id);

        return {
            saved_id: saved.saved_id,
            campground_id: saved.campground_id,
            campground_name: campground?.name || 'Unknown'
        };
    }));

    return results;
};

/**
 * Get all saved campgrounds for a specific user.
 *
 * @async
 * @function
 * @param {string} user_id - Unique identifier of the user.
 * @returns {Promise<Object[]>} Array of all saved campground details including image and date.
 */
exports.getAllSavedCampgrounds = async (user_id) => {
    const savedItems = await Saved.getAllSavedCampgrounds(user_id);

    const results = await Promise.all(savedItems.map(async (saved) => {
        const campground = await campgroundService.getCampgroundDetail(saved.campground_id);

        return {
            saved_id: saved.saved_id,
            campground_id: saved.campground_id,
            campground_name: campground?.name || 'Unknown',
            campground_image: campground?.media_urls[0] || '/images/hero.jpg',
            date: saved.created_at
        };
    }));

    return results;
};
