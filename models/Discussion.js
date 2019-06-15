const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms"
  },
  discussionTopic: {
    type: String,
    required: true
  },
  discussionSubject: {
    type: String
  },
  discussionBody: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Discussion = mongoose.model("discussions", DiscussionSchema);
