const { DataTypes } = require("sequelize");
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
    campsite_uri: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'saved_campsites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false
});

// Save new campsite
Saved.saveCampsite = async (data) => {
    return await Saved.create(data);
};

// Get all user (logged in) saved campsites
Saved.getAllSavedCampsites = async (user) => {
    return await Saved.findAll({
        attributes: ['saved_id', 'campsite_uri', 'created_at'],
        where: { user_id: user }
    });
};

// Get user (logged in) saved campsite detail
Saved.getSavedDetail = async (saved_id, user) => {
    return await Saved.findOne({
        attributes: ['saved_id', 'campsite_uri', 'created_at'],
        where: {
            saved_id,
            user_id: user
        }
    });
};

// Remove saved campsite (hard delete)
Saved.removeSavedCampsite = async (saved_id, user) => {
    return await Saved.destroy({
        where: {
            saved_id,
            user_id: user
        }
    });
};

module.exports = Saved;
