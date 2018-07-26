const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Shema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userType: {
    type: String,
    required: true
  },
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "classrooms"
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
