const User = require('../models/User.model');
const Review = require('../models/Review.model');

// Set up associations here
User.hasMany(Review, {
    foreignKey: 'user_id',
    as: 'reviews'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    User,
    Review
};
