const express = require("express");
const router = express.Router();
const dbconnection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).send("required fields");
  }
  const getUserDetails = `
        SELECT * from users
        where email = ?;
    `;
  dbconnection.query(getUserDetails, [email], async (err, result) => {
    if (err) {
      return res.send("Get Query Error").status(400);
    } else {
      if (result.length > 0) {
        return res.send("User Already Exist").status(404);
      } else {
        const postUserDetails = `
                    INSERT INTO users(email, password)
                    values(?, ?)
                `;
        const bcryptPassword = await bcrypt.hash(password, 10);
        dbconnection.query(
          postUserDetails,
          [email, bcryptPassword],
          (err, result) => {
            if (err) {
              return res.send("Post Query Error");
            } else {
              return res.send("User Added Successfully").status(200);
            }
          }
        );
      }
    }
  });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).send("required fields");
  }
  const selectQuery = "select * from users where email=?";

  dbconnection.query(selectQuery, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send("query error");
    }
    if (result.length === 0) {
      return res.status(403).send("user doesn't exist");
    }
    const comparePswd = await bcrypt.compare(password, result[0].password);
    if (!comparePswd) {
      return res.status(403).send("invalid password");
    }
    const token = jwt.sign(
      { email: result[0].email, password: result[0].password },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
    return res.status(200).send({ token });
  });
});
module.exports = router;
