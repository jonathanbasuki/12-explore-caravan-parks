const { fetchCampgrounds, getCampgroundDetail } = require('../services/Campground.service');

// Fetch campgrounds 
exports.fetchCampgrounds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const location = req.query.location || 'CA';

        const data = await fetchCampgrounds(location, page, limit);

        res.json(data);
    } catch (error) {
        console.error('Controller Error:', error);

        res.status(500).json({ error: 'Failed to get campground data' });
    }
};

// Get campground detail
exports.getCampgroundDetail = async (req, res) => {
    try {
        const state = req.query.state
        const campground = req.query.campground

        const data = await getCampgroundDetail(state, campground);

        res.json(data);
    } catch (error) {
        console.error('Controller Error:', error);

        res.status(500).json({ error: 'Failed to get campground data' });
    }
}