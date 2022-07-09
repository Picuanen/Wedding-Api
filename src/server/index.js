const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("../routes");
const db = require("../config/database/intance");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

db();
app.use("/api", routes);
module.exports = app;
