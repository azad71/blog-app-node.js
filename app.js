// importing dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// app configuartion
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

// db config
mongoose.connect('mongodb://localhost:27017/blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userFindAndModify: false,
});

let db = mongoose.connection;
db.once('open', () => {
	console.log('Connected to MongoDB')
});

db.on('error', err => {
	console.log(err);
});


// importing controllers
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');



app.use(userRoutes);
app.use(authRoutes);
app.use(postRoutes);


app.listen(8000, () => {
    console.log(`Server is running at http://localhost:8000`);
});