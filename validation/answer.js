const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateAnswer(data) {
  let errors = {};
  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (Validator.isEmpty(data.answer)) {
    errors.answer = "Answer Cannot Be Empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
