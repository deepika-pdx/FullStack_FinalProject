/** @format */

require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const dailydiarydb = require("./mongodb/DailyDairyDb");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");

// middlewares
app.use(express.json());
//app.use(function (req, res, next){
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Origin", "Origin, X-Requested-Width, Content-Type, Accept");
  //res.header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, PATCH, DELETE');
  //next();
//});

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));


//app.post('/users', (req, res) => { res.redirect(200, "/auth") });

// routes
app.use("/", userRoutes);
app.use("/", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
