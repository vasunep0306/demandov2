const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms"
  },
  classtitle: {
    type: String
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
    type: Array,
    required: this.isMultipleChoice
  },
  isCurrentQuestion: {
    type: Boolean,
    default: false
  },

  // responses coming from student
  responses: [
    {
      student: {
        name: {
          type: String
        },
        email: {
          type: String
        }
      },
      responsebody: {
        type: String,
        required: true
      },
      correctness: {
        type: Boolean,
        default: false
      }
    }
  ]
});

// check to see if the question is multiple choice to determine whether or not the answerchoices field is required or not
QuestionSchema.methods.isMultipleChoice = function() {
  return this.questiontype === "Multiple Choice";
};

module.exports = Question = mongoose.model("questions", QuestionSchema);
