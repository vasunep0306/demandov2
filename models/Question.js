const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms"
  },

  // responses coming from student
  responses: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      responsebody: {
        type: String,
        required: true
      }
    }
  ]
});

// check to see if the question is multiple choice to determine whether or not the answerchoices field is required or not
isMultipleChoice => {
  return this.questiontype === "Multiple Choice";
};
