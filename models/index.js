/** @format */
const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const dailydiarydb = require("./mongodb/DailyDairyDb");
const TodoItemRoute = require('./routes');

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
app.use('/', TodoItemRoute);
