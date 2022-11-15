/** @format */

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const userdb = require("./mongodb/dailydairydb");

app.get("/dashboard", (req, res) => {
  // res.status(200);
  // res.set({ "Content-Type": "text/html" });
  // res.send(`<h1>Welcome to Daily Dairy</h1>`);
  userdb.dbConnect();
  res.json({ message: "Welcome to Daily Dairy!!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
