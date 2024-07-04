const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose');
mongoose
  .connect("mongodb+srv://rabinabaga:1612ten@cluster0.fyh6ucm.mongodb.net/", {
    dbName: "giventure",
    autoIndex: true,
    autoCreate: true,
  })
  .then((db) => {
    console.log("Db server connected successfully...");
  })
  .catch((error) => {
    console.log("Error connecting database server");
    throw error;
  });