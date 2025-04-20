const Saved = require('../models/Saved.model');

// Save campsite
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

// Get all user (logged-in) saved campsites
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

// Access user (logged-in) saved campsite detail
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

// Remove user (logged-in) saved campsite
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
