const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms"
  },
  topic: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Discussion = mongoose.model("discussions", DiscussionSchema);
