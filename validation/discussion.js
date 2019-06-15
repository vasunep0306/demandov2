const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateDiscussionInput(data) {
  let errors = {};
  // The discussion topic is mandatory
  // The discussion body is mandatory

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
