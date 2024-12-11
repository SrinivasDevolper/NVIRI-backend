const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/jwtVerify");
const dbconnection = require("../config/db");
router.get("/instates", (req, res) => {
  const getIndianStatesQuery = `
    SELECT * FROM indian_states
  `;
  dbconnection.query(getIndianStatesQuery, (err, result) => {
    if (err) {
      return res.send("Query Error").status(400);
    } else {
      return res.send(result).status(200);
    }
  });
});

module.exports = router;
