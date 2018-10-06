const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateAnswer(data) {
  let errors = {};
  data.responsebody = !isEmpty(data.responsebody) ? data.responsebody : "";

  if (Validator.isEmpty(data.responsebody)) {
    errors.responsebody = "Answer Cannot Be Empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
