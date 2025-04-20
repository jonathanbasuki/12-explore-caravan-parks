/**
 * @fileoverview This file sets up associations between the User and Review models.
 * A User can have many Reviews, and each Review belongs to a User.
 */

const User = require('../models/User.model');
const Review = require('../models/Review.model');

/**
 * Defines the one-to-many relationship between User and Review.
 * 
 * A User can have many Reviews.
 * @association
 * @function
 * @param {Model} User - The User model.
 * @param {Model} Review - The Review model.
 * @returns {void}
 */
User.hasMany(Review, {
    foreignKey: 'user_id',
    as: 'reviews'
});

/**
 * Defines the inverse relationship where a Review belongs to a User.
 * 
 * Each Review is written by a User.
 * @association
 * @function
 * @param {Model} Review - The Review model.
 * @param {Model} User - The User model.
 * @returns {void}
 */
Review.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    User,
    Review
};
