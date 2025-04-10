const { DataTypes, Op } = require('sequelize'); // Import Op
const sequelize = require('../config/db.conf');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true // Untuk soft delete
});

// Register new user
User.createUser = async (data) => {
    return await User.create(data);
}

// Get all users (hanya yang tidak dihapus)
User.getAllUsers = async () => {
    return await User.findAll({
        attributes: ['user_id', 'username', 'email', 'created_at'],
        where: {
            deleted_at: null
        }
    });
}

// Get user detail
User.getUserDetail = async (user_id) => {
    return await User.findOne({
        attributes: ['user_id', 'username', 'email', 'created_at'],
        where: {
            user_id,
            deleted_at: null
        }
    });
}

// Update user details
User.updateUserDetail = async (user_id, data) => {
    const [updated] = await User.update(data, {
        where: {
            user_id,
            deleted_at: null
        }
    });

    if (!updated) return null;

    // Fetch and return the updated user details
    return await User.findByPk(user_id, {
        attributes: ['user_id', 'updated_at']
    });
}

// Soft delete user
User.softDeleteUser = async (user_id) => {
    const updated = await User.update(
        { deleted_at: new Date() },
        {
            where: {
                user_id,
                deleted_at: null 
            }
        }
    );

    if (!updated) return null;

    return await User.findByPk(user_id, {
        attributes: ['user_id', 'deleted_at']
    });
}

module.exports = User;