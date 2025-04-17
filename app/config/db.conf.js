const { Sequelize } = require('sequelize');

const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const prefix = process.env.DB_PREFIX;

const sequelize = new Sequelize(name, user, pass, {
    host: host,
    dialect: prefix,
    logging: false,
});

module.exports = sequelize;
