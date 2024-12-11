const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/jwtVerify");
const dbconnection = require("../config/db");
router.get("/technicians", jwtVerify, (req, res) => {
  const getTechniciansQuery = `
    SELECT * FROM technicians
  `;
  dbconnection.query(getTechniciansQuery, (err, result) => {
    if (err) {
      return res.send("Query Error").status(400);
    } else {
      return res.send(result).status(200);
    }
  });
});

module.exports = router;
