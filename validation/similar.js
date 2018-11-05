module.exports = function similar(correctAnswer, studentResponse) {
  let condensedCorrectAnswer = correctAnswer
    .toLowerCase()
    .split(" ")
    .join("");
  let condensedStudentResponse = studentResponse
    .toLowerCase()
    .split(" ")
    .join("");

  let evaluatedResult =
    condensedCorrectAnswer.includes(condensedStudentResponse) ||
    condensedStudentResponse.includes(condensedCorrectAnswer);

  return evaluatedResult;
};
