/** @format */

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const dailydiarydb = require("./mongodb/DailyDairyDb");

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
