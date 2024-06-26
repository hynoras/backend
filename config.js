require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;