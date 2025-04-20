/**
 * @fileoverview Service to manage and format user reviews with campground data.
 */

const Review = require('../models/Review.model');
const campgroundService = require('./Campground.service');

/**
 * Get the most recent reviews made by a user, enriched with campground names.
 * 
 * @async
 * @function
 * @param {string} user_id - The unique identifier of the user.
 * @returns {Promise<Object[]>} List of latest reviews with campground details.
 */
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

/**
 * Get the full history of a user's reviews, enriched with campground info and image.
 * 
 * @async
 * @function
 * @param {string} user_id - The unique identifier of the user.
 * @returns {Promise<Object[]>} List of all user reviews with campground details.
 */
exports.getReviewHistory = async (user_id) => {
    const reviews = await Review.getReviewHistory(user_id);

    const results = await Promise.all(reviews.map(async (review) => {
        const campground = await campgroundService.getCampgroundDetail(review.campground_id);

        return {
            review_id: review.review_id,
            campground_id: review.campground_id,
            campground_name: campground?.name || 'Unknown',
            campground_image: campground.media_urls[0] || '/images/hero.jpg',
            comment: review.comment,
            rating: review.rating,
            created_at: review.created_at,
            updated_at: review.updated_at
        };
    }));

    return results;
};
