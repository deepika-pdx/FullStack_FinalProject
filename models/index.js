require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const dailydiarydb = require("./mongodb/DailyDairyDb");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");
//const passport = require("passport");
const cookieSession = require("cookie-session");
//const passportSetup = require("./passport");



// middlewares
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["4rfv%TGB"],
    maxAge: 24*60*60*100,
  })
);

//app.use(passport.initialize());
//app.use(passport.session());

const corsOptions ={
  origin:'*',
  methods: "GET, POST, PUT, DELETE",
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
