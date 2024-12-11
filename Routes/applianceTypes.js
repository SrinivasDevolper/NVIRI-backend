const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/jwtVerify");
const dbconnection = require("../config/db");
router.get("/appliance", jwtVerify, (req, res) => {
  const getApplianceTypesQuery = `
    SELECT * FROM appliance_types
  `;
  dbconnection.query(getApplianceTypesQuery, (err, result) => {
    if (err) {
      return res.send("Query Error").status(400);
    } else {
      return res.send(result).status(200);
    }
  });
});

module.exports = router;
