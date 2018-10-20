const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateClassroomInput(data) {
  let errors = {};
  data.classcode = !isEmpty(data.classcode) ? data.classcode : "";

  data.classtitle = !isEmpty(data.classtitle) ? data.classtitle : "";
  data.registeration_pin = !isEmpty(data.registeration_pin)
    ? data.registeration_pin
    : "";

  if (Validator.isEmpty(data.classcode)) {
    errors.classcode = "Classcode field is required";
  }

  if (Validator.isEmpty(data.classtitle)) {
    errors.classtitle = "Classtitle field is required";
  }
  if (Validator.isEmpty(data.registeration_pin)) {
    errors.classtitle = "Registeration pin is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
