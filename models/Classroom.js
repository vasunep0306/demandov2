const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  // Eg mat112
  classcode: {
    type: String,
    required: true
  },
  registeration_pin: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  classtitle: {
    type: String,
    required: true
  },
  // Professor for this class.
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  // whos enrolled in the course
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions"
    }
  ],
  currentQuestion: {
    type: Schema.Types.ObjectId,
    ref: "questions"
  },
  discussions: [
    {
      type: Schema.Types.ObjectId,
      ref: "discussions"
    }
  ]
});

module.exports = Classroom = mongoose.model("classrooms", ClassroomSchema);
