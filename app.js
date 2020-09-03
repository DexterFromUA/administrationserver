const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
require("dotenv").config();

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new InstagramStrategy({
  clientID: "2690149747939469",
  clientSecret: "41cb929c262b7872f58f2b17368e84cd",
  callbackURL: "http://localhost:8080/auth/instagram/callback",
}, (accessToken, refreshToken, profile, done) => {
  console.log('Instagram Strategy accessToken: ', accessToken);
  console.log('Instagram Strategy refreshToken: ', refreshToken);
  console.log('Instagram Strategy profile: ', profile);
  done(null, profile);
}));

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

app.use("/auth/instagram", require('./routes/auth'));
app.get("/api", (req, res) => {
  res.send({message: "API"});
});
app.use("/news", require('./routes/news'));
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
