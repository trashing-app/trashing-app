require("dotenv").config();
const express = require("express");
const app = express();

const route = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", route);

module.exports = app