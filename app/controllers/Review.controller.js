const Review = require('../models/Review.model');

// Add campground review
exports.addCampgroundReview = async (req, res) => {
    try {
        const review = await Review.addCampgroundReview(req.body);

        res.status(201).json({
            status: 201,
            message: 'Campground review addded successfully!',
            data: review
        });
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
        const reviews = await Review.getCampgroundReview(req.body.campground_id, req.body.campground_state);

        res.status(201).json({
            status: 201,
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
