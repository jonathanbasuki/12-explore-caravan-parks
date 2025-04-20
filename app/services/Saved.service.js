const Saved = require('../models/Saved.model');
const campgroundService = require('./Campground.service');

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