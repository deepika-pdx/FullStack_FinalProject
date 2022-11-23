/** @format */

const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
const url = "mongodb+srv://dailyuser:DailyDairy565@dailydairycluster.oj0wdsh.mongodb.net/DailyDatabase?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
    //app.listen(3002, () => console.log("Server Up and running"));
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
