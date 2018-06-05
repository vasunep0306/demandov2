const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const classrooms = require("./routes/classrooms");
const questions = require("./routes/questions");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;
//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/classrooms", classrooms);
app.use("/api/questions", questions);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
