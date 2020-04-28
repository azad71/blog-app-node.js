// importing dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// load models
const User = require("./models/user");

// session configuration
const options = {
  url: "mongodb://localhost:27017/blog_app",
  collection: "sessions",
  ttl: 24 * 60 * 60,
};

app.use(
  session({
    secret: "Wubba lubba dub dub",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore(options),
  })
);

app.use(async (req, res, next) => {
  if (req.user) {
    const user = await User.findById(req.user._id);
    req.session.user = user;
    req.session.isLoggedIn = true;
  } else {
    req.session.isLoggedIn = false;
  }
  next();
});

// app configuartion
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// db config
mongoose.connect("mongodb://localhost:27017/blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

let db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.log(err);
});

// importing controllers
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

app.use(userRoutes);
app.use(authRoutes);
app.use(postRoutes);

app.listen(8000, () => {
  console.log(`Server is running at http://localhost:8000`);
});
