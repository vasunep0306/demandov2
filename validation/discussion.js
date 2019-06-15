const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateDiscussionInput(data) {
  let errors = {};
  // The discussion topic is mandatory
  data.discussionTopic = !isEmpty(data.discussionTopic)
    ? data.discussionTopic
    : "";
  // The discussion subject is mandatory
  data.discussionSubject = !isEmpty(data.discussionSubject)
    ? data.discussionSubject
    : "";
  // The discussion body is mandatory
  data.discussionBody = !isEmpty(data.discussionBody)
    ? data.discussionBody
    : "";

  // Validate discussion topic
  if (Validator.isEmpty(data.discussionTopic)) {
    errors.discussionTopic = "The discussion topic field should not be empty.";
  }
  // Validate discussion subject
  // Validate discussion body

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
