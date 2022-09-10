require("dotenv").config();
const sequelize = require("sequelize");

const dbOptions = {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false, // not required, remove the logging of every interaction with the DB
};

let connection;
if (process.env.JAWSDB_URL) {
  connection = new sequelize(process.env.JAWSDB_URL);
} else {
  connection = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    dbOptions
  );
}

module.exports = connection;
