const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

const sequelize = require("../config/db.conf");

const Saved = sequelize.define('Saved', {
    saved_id: {
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
    }
}, {
    tableName: 'saved_campgrounds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false
});

Saved.checkSavedByUser = async ({ user_id, campground_id }) => {
    return await Saved.findOne({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: {
            user_id,
            campground_id
        }
    });
}

// Save new campsite
Saved.saveCampsite = async ({ user_id, campground_id }) => {
    const savedId = uuidv4();

    return await Saved.create({
        saved_id: savedId,
        user_id,
        campground_id
    });
};

// Get 5 latest wishlist history 
Saved.getLatestSaved = async (user_id) => {
    return await Saved.findAll({
        attributes: ['saved_id', 'campground_id'],
        where: {
            user_id
        },
        order: [
            ['created_at', 'DESC']
        ],
        limit: 5,
    })
}

// Get all user (logged in) saved campsites
Saved.getAllSavedCampsites = async (user) => {
    return await Saved.findAll({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: { user_id: user }
    });
};

// Get user (logged in) saved campsite detail
Saved.getSavedDetail = async (saved_id, user) => {
    return await Saved.findOne({
        attributes: ['saved_id', 'campground_id', 'created_at'],
        where: {
            saved_id,
            user_id: user
        }
    });
};

// Remove saved campsite (hard delete)
Saved.removeSavedCampsite = async ({ user_id, campground_id }) => {
    return await Saved.destroy({
        where: {
            user_id,
            campground_id
        }
    });
};

module.exports = Saved;
