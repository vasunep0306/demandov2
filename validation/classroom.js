// Eg mat112
// classcode: {
//   type: String,
//   required: true
// },
// cid: {
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
  data.cid = !isEmpty(data.cid) ? data.cid : "";
  data.classtitle = !isEmpty(data.classtitle) ? data.classtitle : "";

  if (Validator.isEmpty(data.classcode)) {
    errors.classcode = "Classcode field is required";
  }
  if (Validator.isEmpty(data.cid)) {
    errors.cid = "cid field is required";
  }
  if (Validator.isEmpty(data.classtitle)) {
    errors.classtitle = "classtitle field is required";
  }
  if (Validator.isEmpty(data.registeration_pin)) {
    errors.classtitle = "Registeration pin is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
