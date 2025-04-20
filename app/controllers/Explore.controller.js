const Saved = require('../models/Saved.model');
const Booking = require('../models/Booking.model');

// Explore page (search box)
exports.renderExplorePage = (req, res) => {
    res.render('pages/explore/explore', {
        title: "Explore Campgrounds",
        scripts: ['/js/pages/search_places.js']
    })
}

// Search result page
exports.renderResultPage = async (req, res) => {
    const { location, page = 1, limit = 10 } = req.query;

    const response = await fetch(`http://localhost:3000/api/campgrounds?state=${location}&page=${page}&limit=${limit}`);
    const results = await response.json();

    res.render('pages/explore/search', {
        title: "Search Results",
        campgrounds: results.data,
        metadata: results.metadata,
        location: location,
        scripts: []
    })
}

// Details page
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
        const campgroundResponse = await fetch(`http://localhost:3000/api/campgrounds/${campgroundId}`);
        const campgroundData = await campgroundResponse.json();

        if (!campgroundResponse.ok || !campgroundData.data) {
            return res.status(500).json({ status: 500, message: 'Failed to fetch campground details' });
        }

        const realCampgroundId = campgroundData.data.id;

        // Fetch reviews
        const reviewResponse = await fetch(`http://localhost:3000/reviews?campground_id=${realCampgroundId}`);
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
