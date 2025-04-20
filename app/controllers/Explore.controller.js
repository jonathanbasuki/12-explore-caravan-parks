const Saved = require('../models/Saved.model');
const Booking = require('../models/Booking.model');

/**
 * Renders the explore page with a search box for campgrounds.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Renders the explore page
 */
exports.renderExplorePage = (req, res) => {
    res.render('pages/explore/explore', {
        title: "Explore Campgrounds",
        scripts: ['/js/pages/search_places.js']
    });
};

/**
 * Renders the search results page based on location query.
 * @param {Object} req - Express request object containing query parameters (location, page, limit)
 * @param {Object} res - Express response object
 * @returns {void} Renders the search results page with campground data
 * @throws {Error} If the API call to fetch campgrounds fails
 */
exports.renderResultPage = async (req, res) => {
    const { location, page = 1, limit = 10 } = req.query;

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/campgrounds?state=${location}&page=${page}&limit=${limit}`);
        const results = await response.json();

        res.render('pages/explore/search', {
            title: "Search Results",
            campgrounds: results.data,
            metadata: results.metadata,
            location: location,
            scripts: []
        });
    } catch (error) {
        console.error('Error in renderResultPage:', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

/**
 * Renders the campground details page with associated reviews and user-specific data.
 * @param {Object} req - Express request object containing campground ID in params and user data if authenticated
 * @param {Object} res - Express response object
 * @returns {void} Renders the campground details page or returns error response
 * @throws {Error} If fetching campground details or reviews fails
 */
exports.renderDetailPage = async (req, res) => {
    try {
        const campgroundId = req.params.campground_id;

        let saved = false;
        let booked = false;

        if (req.user) {
            saved = await Saved.checkSavedByUser({ user_id: req.user.id, campground_id: req.params.campground_id });
            booked = await Booking.checkBookingByUser({ user_id: req.user.id, campground_id: req.params.campground_id });
        }

        // Fetch campground detail
        const campgroundResponse = await fetch(`${process.env.BASE_URL}/api/campgrounds/${campgroundId}`);
        const campgroundData = await campgroundResponse.json();

        if (!campgroundResponse.ok || !campgroundData.data) {
            return res.status(500).json({ status: 500, message: 'Failed to fetch campground details' });
        }

        // Fetch reviews
        const reviewResponse = await fetch(`${process.env.BASE_URL}/reviews?campground_id=${campgroundId}`);
        const reviewData = await reviewResponse.json();

        if (!reviewResponse.ok || !reviewData.data) {
            return res.status(500).json({ status: 500, message: 'Failed to fetch reviews' });
        }

        res.render('pages/explore/details', {
            title: "Campground Details",
            isSaved: saved,
            isBooked: booked,
            campground: campgroundData.data,
            reviews: reviewData.data,
            scripts: []
        });
    } catch (error) {
        console.error('Error in renderDetailPage:', error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};