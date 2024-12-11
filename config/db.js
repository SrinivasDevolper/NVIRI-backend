const db = require("mysql2");
const dotenv = require("dotenv").config();
const dbconnection = db.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
dbconnection.connect((err) => {
  if (err) {
    console.log("database is connected");
  } else {
    console.log("database is connected");
  }
});

module.exports = dbconnection;
