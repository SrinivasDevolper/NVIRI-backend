const db = require("mysql2");
const dbconnection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "Srinivas@123",
  database: "nviritable",
});
dbconnection.connect((err) => {
  if (err) {
    console.log("database is connected");
  } else {
    console.log("database is connected");
  }
});

module.exports = dbconnection;
