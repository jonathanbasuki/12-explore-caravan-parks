const Review = require('../models/Review.model');
const campgroundService = require('./Campground.service');

exports.getLatestReviewsWithCampground = async (user_id) => {
    const reviews = await Review.getLatestReview(user_id);

    const results = await Promise.all(reviews.map(async (review) => {
        const campground = await campgroundService.getCampgroundDetail(review.campground_id);

        return {
            review_id: review.review_id,
            campground_id: review.campground_id,
            campground_name: campground?.name || 'Unknown',
            comment: review.comment,
            date: review.created_at
        };
    }));

    return results;
};