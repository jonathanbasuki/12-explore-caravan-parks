const Saved = require('../models/Saved.model');

/**
 * Saves a campsite to the logged-in user's saved list.
 * @param {Object} req - Express request object containing user ID in req.user and campground ID in body
 * @param {Object} res - Express response object
 * @returns {void} Redirects to the campground page on success or returns error response
 * @throws {Error} If saving the campsite fails
 */
exports.saveCampsite = async (req, res) => {
    try {
        const user_id = req.user.id;
        const campground_id = req.body.campground_id;

        const campsite = await Saved.saveCampsite({ user_id, campground_id });

        res.redirect(`/search/campground/${campground_id}`);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves all saved campsites for the logged-in user.
 * @param {Object} req - Express request object containing user ID in req.user
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with saved campsites data or error response
 * @throws {Error} If fetching saved campsites fails
 */
exports.getAllSavedCampsites = async (req, res) => {
    try {
        const campsites = await Saved.getAllSavedCampsites(req.user.id);

        res.status(200).json({
            status: 200,
            message: 'Saved campsites fetched successfully!',
            data: campsites
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Retrieves details of a specific saved campsite for the logged-in user.
 * @param {Object} req - Express request object containing saved ID in params and user ID in body
 * @param {Object} res - Express response object
 * @returns {void} Returns JSON with saved campsite details or error response
 * @throws {Error} If fetching saved campsite details fails
 */
exports.getSavedDetail = async (req, res) => {
    try {
        const campsite = await Saved.getSavedDetail(req.params.saved_id, req.body.user_id);

        if (!campsite) return res.status(404).json({
            status: 404,
            message: 'Saved campsite not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'Campsite detail fetched successfully!',
            data: campsite
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

/**
 * Removes a campsite from the logged-in user's saved list.
 * @param {Object} req - Express request object containing user ID in req.user and campground ID in params
 * @param {Object} res - Express response object
 * @returns {void} Redirects to the previous page on success or returns error response
 * @throws {Error} If removing the saved campsite fails
 */
exports.removeSavedCampsite = async (req, res) => {
    try {
        const user_id = req.user.id;
        const campground_id = req.params.campground_id;

        const deleted = await Saved.removeSavedCampsite({ user_id, campground_id });

        if (!deleted) return res.status(404).json({
            status: 404,
            message: 'Saved campsite not found.'
        });

        res.redirect('back');
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};