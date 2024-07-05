const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

app.use(cors());
require("./mongodb.config");
const routes = require("../routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static("public"));

app.use("/api/v1/", routes);

app.use((req, res, next) => {
  next({ code: 404, message: "Not found" });
});

app.use((error, req, res, next) => {
  let code = error.code ?? 500;
  let msg = error.message ?? "Internal server error";
console.log("error", error.message);
  res.status(code).json({
    result: null,
    msg: msg,
    meta: null,
  });
});

module.exports = app;
