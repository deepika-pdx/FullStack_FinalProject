/** @format */
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./mongodb/DailyDiaryDb');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const thoughtsRoute = require('./routes/thoughts');
const newsRoute = require('./routes/news');
const waterTrackerRoutes = require('./routes/waterTracker');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['4rfv%TGB'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', todoRoutes);
app.use('/', thoughtsRoute);
app.use('/', newsRoute);
app.use('/', waterTrackerRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
