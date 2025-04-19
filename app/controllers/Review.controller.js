const Review = require('../models/Review.model');

// Add campground review
exports.addCampgroundReview = async (req, res) => {
    try {
        const { campground_id, rating, comment } = req.body;
        const user_id = req.user.id;

        const review = await Review.addCampgroundReview({
            user_id,
            campground_id,
            rating,
            comment
        });

        res.redirect(`/search/campground/${campground_id}`);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};


// Get campground review
exports.getCampgroundReview = async (req, res) => {
    try {
        const reviews = await Review.getCampgroundReview(req.query.campground_id);

        res.status(200).json({
            status: 200,
            message: 'Campground reviews fetched successfully!',
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

// Update campground review
exports.updateCampgroundReview = async (req, res) => {
    try {
        const updatedReview = await Review.updateCampgroundReview(req.params.review_id, req.body);

        if (!updatedReview) {
            return res.status(404).json({
                status: 404,
                message: 'Review not found or no changes made.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Campground review updated successfully!',
            data: updatedReview
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}

// Delete campground review
exports.deleteCampgroundReview = async (req, res) => {
    try {
        const deleted = await Review.deleteCampgroundReview(req.params.review_id, req.body.user_id);

        if (!deleted) return res.status(404).json({
            status: 404,
            message: 'Campground review not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'Campground review deleted successfully!'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};
