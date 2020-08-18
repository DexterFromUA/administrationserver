const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Request-With, content-type, Authorization"
  );

  return next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/api", (req, res) => {
  res.send({message: "API"});
});
app.get("*", (req, res) => {
  res.send({message: "This is REST API server :("});
});
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error - req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
