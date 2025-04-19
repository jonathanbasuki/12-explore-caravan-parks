const { fetchCampgrounds, getCampgroundDetail } = require('../services/Campground.service');

// Fetch campgrounds 
exports.fetchCampgrounds = async (req, res) => {
    try {
        const { state, page = 1, limit = 10 } = req.query;

        const itemsPerPage = 10;
        const offset = (parseInt(page) - 1) * itemsPerPage;

        const results = await fetchCampgrounds(state, parseInt(limit), offset);

        return res.json(results);
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};


// Get campground detail
exports.getCampgroundDetail = async (req, res) => {
    try {
        const campground_id = req.params.campground_id;

        const result = await getCampgroundDetail(campground_id);

        res.status(200).json({
            status: 200,
            message: 'Campground details retrieved successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch campground details',
            error: error.message
        });
    }
}