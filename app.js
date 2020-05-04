// importing dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");
const uid = require("uid");
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
  try {
    // check if session has any user attached
    if (!req.session.user) {
      return next();
    }
    const user = await User.findById(req.session.user._id);
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    next();
  }
});

// app configuartion
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// flash message configuration
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  next();
});

// image configuration
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uid()}__${file.originalname}`);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: filefilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
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
