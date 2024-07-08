const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const { ZodError } = require("zod");
const {TokenExpiredError} = require("jsonwebtoken")

app.use(cors());
require("./mongodb.config");
const routes = require("../routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.static("public"));

app.use("/api/v1/", routes);

app.use((req, res, next) => {
  next({ code: 404, message: "Not found" });
});

app.use((error, req, res, next) => {
  let data = {};
  let errBag;
  let code;
  console.log("error", error);

  if (error instanceof ZodError) {
    error.code = 403;
    errBag = error.errors.map((error) => {
      return { ...data, [error["path"][0]]: error.message };
    });
  } else if (error instanceof TokenExpiredError) {
    error.code = 401;
    console.log("error here", error.code);
  } else {
    errBag = error;
    console.log("error bag", errBag);
  }

  code = error.code ?? 500;
  let msg = errBag ?? "external server error";

  res.status(code).json({
    result: null,
    msg: msg,
    meta: null,
  });
});

module.exports = app;
