const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.conf");

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
    campground_state: {
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
Review.addCampgroundReview = async (data) => {
    return await Review.create(data);
}

// Get campgrounds review
Review.getCampgroundReview = async (campground_id, campground_state) => {
    return await Review.findOne({
        attributes: ['review_id', 'rating', 'comment'],
        where: {
            campground_id,
            campground_state
        }
    });
}

// Update campground review
Review.updateCampgroundReview = async (review_id, data) => {
    const [updated] = await Review.update(data, {
        where: {
            review_id,
            user_id: data.user_id
        }
    });

    if (!updated) return null;

    // Fetch and return the updated booking details
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

module.exports = Review