// Eg mat112
// classcode: {
//   type: String,
//   required: true
// },
// crn: {
//   type: String,
//   required: true
// },
// classtitle: {
//   type: String,
//   required: true
// },
const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateClassroomInput(data) {
  let errors = {};
  data.classcode = !isEmpty(data.classcode) ? data.classcode : "";
  data.crn = !isEmpty(data.crn) ? data.crn : "";
  data.classtitle = !isEmpty(data.classtitle) ? data.classtitle : "";

  if (Validator.isEmpty(data.classcode)) {
    errors.classcode = "Classcode field is required";
  }
  if (Validator.isEmpty(data.crn)) {
    errors.crn = "Crn field is required";
  }
  if (Validator.isEmpty(data.classtitle)) {
    errors.classtitle = "classtitle field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
