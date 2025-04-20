const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../config/db.conf");

// Import User model
const User = require("../models/User.model");

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

// Create new review
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

// Get 5 latest review history 
Review.getLatestReview = async (user_id) => {
    return await Review.findAll({
        attributes: ['review_id', 'campground_id', 'comment', 'created_at'],
        where: {
            user_id
        },
        order: [
            ['created_at', 'DESC']
        ],
        limit: 5,
    })
}

// Get campground reviews with the username
Review.getCampgroundReview = async (campground_id) => {
    return await Review.findAll({
        attributes: ['review_id', 'rating', 'comment'],
        where: { campground_id },
        include: [{
            model: User,
            as: 'user',
            attributes: ['username']  // Get the username of the user who made the review
        }]
    });
};

// Update campground review
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

// Delete campground review
Review.deleteCampgroundReview = async (review_id, user) => {
    return await Review.destroy({
        where: {
            review_id,
            user_id: user
        }
    });
};

module.exports = Review;