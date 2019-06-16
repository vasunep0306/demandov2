const Filter = require("bad-words");
const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateCommentInput(data) {
  let errors = {};
  filter = new Filter();
  data.comment = !isEmpty(data.classcode) ? filter.clean(data.comment) : "";

  if (Validator.isEmpty(data.comment)) {
    errors.classcode = "Comment field should not be empty.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
