const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms"
  },
  questiontype: {
    type: String,
    required: true
  },
  questionbody: {
    type: String,
    required: true
  },
  correctanswer: {
    type: String,
    required: true
  },
  answerchoices: {
    type: String,
    required: this.isMultipleChoice
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
QuestionSchema.methods.isMultipleChoice = function() {
  return this.questiontype === "Multiple Choice";
};

module.exports = Question = mongoose.model("questions", QuestionSchema);
