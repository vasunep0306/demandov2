const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateDiscussionInput(data) {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
