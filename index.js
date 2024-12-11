const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dbconnection = require("./config/db");
const dotenv = require("dotenv").config();
const authRouter = require("./auth/users");
const technicians = require("./Routes/technicians");
const indianStates = require("./Routes/indianStates");
const getApplianceTypesQuery = require("./Routes/applianceTypes");
app.use("/nviri", authRouter);
app.use("/nviri", technicians);
app.use("/nviri", indianStates);
app.use("/nviri", getApplianceTypesQuery);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running", PORT);
});
