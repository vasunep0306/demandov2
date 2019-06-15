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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
