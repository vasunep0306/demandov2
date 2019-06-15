const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateDiscussionInput(data) {
  let errors = {};
  // The discussion topic is mandatory
  data.topic = !isEmpty(data.topic) ? data.topic : "";
  // The discussion subject is mandatory
  // The discussion body is mandatory

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
