const Sequelize = require("sequelize");
const configFile = require("../../config/database");

const config = process.env.NODE_ENV === "test" ? configFile.test : configFile.development;

const connection = new Sequelize(config);
if(!connection) throw new Error("Problemas ao se conectar ao banco");
console.log("Connected to the database");

module.exports = connection;
