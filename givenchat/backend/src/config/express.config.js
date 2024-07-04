const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
require("./mongodb.config");
const routes = require("../routes");

app.use(express.json());

app.use("/api/v1/", routes);

app.use((req, res, next) => {
  next({ code: 404, message: "Not found" });
});

app.use((error, req, res, next) => {
  let code = error.code ?? 500;
  let msg = error.message ?? "Internal server error";

  res.status(code).json({
    result: null,
    msg: msg,
    meta: null,
  });
});

module.exports = app;
