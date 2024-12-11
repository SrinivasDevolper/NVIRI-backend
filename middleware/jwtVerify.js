const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const jwtVerify = (req, res, next) => {
  let jwtToken;
  const getJwtToken = req.headers["authorization"];
  if (getJwtToken !== undefined) {
    jwtToken = getJwtToken;
  }
  if (jwtToken === undefined) {
    return res.status(401).send("Invalid JwToken");
  } else {
    jwt.verify(jwtToken, process.env.JWT_KEY, async (err, result) => {
      if (err) {
        console.log("technicians undefined", err);
        res.send(401).send("Invalid JwToken");
      } else {
        next();
      }
    });
  }
};

module.exports = jwtVerify;
