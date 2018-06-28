const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  // Eg mat112
  classcode: {
    type: String,
    required: true
  },
  // doesn't have to be the real crn. the teacher just makes it up. students get this from teacher and they lookup course.
  crn: {
    type: String,
    required: true
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
  }
});

module.exports = Classroom = mongoose.model("classrooms", ClassroomSchema);
