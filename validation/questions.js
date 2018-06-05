const Validator = require("validator");
const isEmpty = require("./isEmpty");
const detect = require("detect-csv");

// questiontype: {
//   type: String,
//   required: true
// },
// questionbody: {
//   type: String,
//   required: true
// },
// // a comma separated value string
// answerchoices: {
//   type: String,
//   required: isMultipleChoice
// },
// correctanswer: {
//   type: String,
//   required: true
// },
module.exports = function validateNewQuestion(data) {
  let errors = {};
  let isMultipleChoice = false;
  //set up the initial data fields
  data.questiontype = !isEmpty(data.questiontype) ? data.questiontype : "";
  data.questionbody = !isEmpty(data.questionbody) ? data.questionbody : "";
  data.correctanswer = !isEmpty(data.correctanswer) ? data.correctanswer : "";
  // check answerchoices
  if (!isEmpty(data.questiontype) || data.questiontype === "multiple choice") {
    data.answerchoices = !isEmpty(data.answerchoices) ? data.answerchoices : "";
    isMultipleChoice = true;
  }
  if (Validator.isEmpty(data.questiontype)) {
    errors.questiontype = "You need to specify the type of question required";
  }
  if (Validator.isEmpty(data.questionbody)) {
    errors.questionbody = "You need to have a question body";
  }

  if (Validator.isEmpty(data.correctanswer)) {
    errors.correctanswer = "You need to have a correct answer";
  }
  if (isMultipleChoice) {
    if (Validator.isEmpty(data.answerchoices)) {
      errors.answerchoices = "You need to have correct answer choices";
    } else if (!detect(answerchoices)) {
      errors.answerchoicesnotcsv = "Must be csv";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
