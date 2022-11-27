/** @format */

require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const db = require("./mongodb/DailyDiaryDb");
const bodyParser = require("body-parser");
const axios = require("axios");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
// middlewares
app.use(express.json());
//app.use(function (req, res, next){
//res.header("Access-Control-Allow-Origin", "*");
//res.header("Access-Control-Allow-Origin", "Origin, X-Requested-Width, Content-Type, Accept");
//res.header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, PATCH, DELETE');
//next();
//});
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//app.post('/users', (req, res) => { res.redirect(200, "/auth") });

// routes
app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/thoughts", async (req, res) => {
  try {
    const thoughtData = await db.ThoughtData.find({});
    return res.status(200).json(thoughtData);
  } catch (e) {
    console.log(e);
  }
});

app.get("/latestNews", async (req, res) => {
  try {
    const newsData = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_13724c1366d470e67a54f61825c119cd1821a&country=us"
    );
    if (newsData.data != null && newsData.data.status == "success") {
      const newsResults = newsData.data.results;
      let newsExtractedResult = [];
      for (let newsIndex = 0; newsIndex < 10; newsIndex++) {
        newsExtractedResult.push(newsResults[newsIndex]);
      }
      return res.status(200).json(newsExtractedResult);
    }
  } catch (error) {
    const errorJson = { status: error.response.status, statusText: error.response.statusText };
    return res.status(error.response.status).json(errorJson);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
