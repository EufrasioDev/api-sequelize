const Sequelize = require("sequelize");
const configurations = require("../../config/database");

const config = process.env.NODE_ENV === "test" ? configurations.test : configurations.development;

const connection = new Sequelize(config);

module.exports = connection;