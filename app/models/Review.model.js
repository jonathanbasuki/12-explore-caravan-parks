/**
 * @fileoverview Review model definition and custom methods for campground reviews.
 * Uses Sequelize ORM to interact with the 'reviews' table in the database.
 */

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../config/db.conf");

// Import User model for association
const User = require("../models/User.model");

/**
 * Sequelize model for Review.
 * 
 * @typedef {Object} Review
 * @property {string} review_id - Primary key, unique ID for each review
 * @property {string} user_id - ID of the user who made the review
 * @property {string} campground_id - ID of the reviewed campground
 * @property {number} rating - Rating value given by the user
 * @property {string} comment - User's written review
 * @property {Date} created_at - Timestamp of review creation
 * @property {Date} updated_at - Timestamp of last update
 */
const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    campground_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
});

/**
 * Create a new review for a campground.
 * 
 * @async
 * @function
 * @param {Object} reviewData
 * @param {string} reviewData.user_id - ID of the user
 * @param {string} reviewData.campground_id - ID of the campground
 * @param {number} reviewData.rating - Rating given by the user
 * @param {string} reviewData.comment - Comment of the review
 * @returns {Promise<Review>} The created review
 */
Review.addCampgroundReview = async ({ user_id, campground_id, rating, comment }) => {
    const reviewId = uuidv4();

    return await Review.create({
        review_id: reviewId,
        user_id,
        campground_id,
        rating,
        comment
    });
};

/**
 * Get the 5 most recent reviews made by a user.
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Review[]>} List of latest reviews
 */
Review.getLatestReview = async (user_id) => {
    return await Review.findAll({
        attributes: ['review_id', 'campground_id', 'comment', 'created_at'],
        where: { user_id },
        order: [['created_at', 'DESC']],
        limit: 5,
    });
};

/**
 * Get all reviews for a campground, including the reviewer's username.
 * 
 * @async
 * @function
 * @param {string} campground_id - ID of the campground
 * @returns {Promise<Object[]>} List of reviews with usernames
 */
Review.getCampgroundReview = async (campground_id) => {
    return await Review.findAll({
        attributes: ['review_id', 'rating', 'comment'],
        where: { campground_id },
        include: [{
            model: User,
            as: 'user',
            attributes: ['username']
        }]
    });
};

/**
 * Get all review history for a specific user.
 * 
 * @async
 * @function
 * @param {string} user_id - ID of the user
 * @returns {Promise<Review[]>} List of all user's reviews
 */
Review.getReviewHistory = async (user_id) => {
    return await Review.findAll({
        attributes: ['review_id', 'campground_id', 'rating', 'comment', 'created_at', 'updated_at'],
        where: { user_id },
        order: [['created_at', 'DESC']]
    });
};

/**
 * Update an existing campground review.
 * 
 * @async
 * @function
 * @param {string} review_id - ID of the review to update
 * @param {Object} data - New review data
 * @param {string} data.user_id - ID of the user (for verification)
 * @param {number} [data.rating] - New rating
 * @param {string} [data.comment] - New comment
 * @returns {Promise<Object|null>} Updated review info or null if not found
 */
Review.updateCampgroundReview = async (review_id, data) => {
    const [updated] = await Review.update(data, {
        where: {
            review_id,
            user_id: data.user_id
        }
    });

    if (!updated) return null;

    return await Review.findByPk(review_id, {
        attributes: ['review_id', 'updated_at']
    });
};

/**
 * Delete a campground review.
 * 
 * @async
 * @function
 * @param {string} review_id - ID of the review to delete
 * @param {string} user - ID of the user (to authorize deletion)
 * @returns {Promise<number>} Number of records deleted (0 or 1)
 */
Review.deleteCampgroundReview = async (review_id, user) => {
    return await Review.destroy({
        where: {
            review_id,
            user_id: user
        }
    });
};

module.exports = Review;
