const express = require("express");
const app = express();
const port = 80;

module.exports = app;

var session = require("express-session");

// config express-session
var sess = {
  secret: "CHANGE THIS TO A RANDOM SECRET",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(session(sess));

// Load environment variables from .env
var dotenv = require("dotenv");
dotenv.config();

// connect to server with mongoose
var mongoose = require("mongoose"),
  Admin = mongoose.mongo.Admin;
mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGODB_USERNAME +
    ":" +
    process.env.MONGODB_PASSWORD +
    "@farm-to-table-lmcdt.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Connected to MongoDB Atlas!!!");
});

// define a schema for how the data will look
// const dbSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   accountType: String,
// });

// const Model = mongoose.model("Model", dbSchema);

// const testModel = new Model({
//   email: "prithu.pareek2019@gmail.com",
//   name: "Prithu Pareek",
//   accountType: "farmer",
// });

// testModel
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log("Error: ", err));

// Load Passport
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback",
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// app.use(
//   "/",
//   express.static("./dist", {
//     index: "index.html",
//   })
// );

if (process.env.UNDER_CONSTRUCTION == "true") {
  var comingSoonRouter = require("./routes/comingsoon");
  app.use("/", comingSoonRouter);
} else {
  var indexRouter = require("./routes/index");
  var authRouter = require("./routes/auth");
  var loginRouter = require("./routes/login");
  var aboutRouter = require("./routes/about");
  var contactRouter = require("./routes/contact");
  var donateRouter = require("./routes/donate");

  app.use("/", authRouter);
  app.use("/", loginRouter);
  app.use("/", aboutRouter);
  app.use("/", contactRouter);
  app.use("/", donateRouter);
  app.use("/", indexRouter);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
