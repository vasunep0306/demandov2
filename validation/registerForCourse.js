const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCourseRegisterationInput(data) {
  let errors = {};
  data.cid = !isEmpty(data.cid) ? data.cid : "";
  if (Validator.isEmpty(data.cid)) {
    errors.cid = "cid field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
