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
    type: String,
    required: true
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
    data: {
      name: String,
      email: String
    }
  },
  comments: [
    {
      user: {
        name: {
          type: String
        },
        email: {
          type: String
        }
      },
      comment: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Discussion = mongoose.model("discussions", DiscussionSchema);
