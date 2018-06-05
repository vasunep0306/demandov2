const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const classrooms = require("./routes/api/classrooms");
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

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
