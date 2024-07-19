const config = require("../configs/Database");
const Sequel = require("sequelize");

const MySQLSequel = new Sequel(
    config.DBConnectors.database,
    config.DBConnectors.username,
    config.DBConnectors.password,
    {
        host: config.DBConnectors.host,
        port: config.DBConnectors.port,
        dialect: config.DBConnectors.dialect,
        logging: false,
    }
);

module.exports = MySQLSequel;
