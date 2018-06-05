const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCourseRegisterationInput(data) {
  let errors = {};
  data.crn = !isEmpty(data.crn) ? data.crn : "";
  if (Validator.isEmpty(data.crn)) {
    errors.crn = "Crn field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
