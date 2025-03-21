const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('soa_explore_caravan_parks', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
