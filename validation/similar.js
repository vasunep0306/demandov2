module.exports = function similar(correctAnswer, studentResponse) {
  let condensedCorrectAnswer = correctAnswer
    .toLowerCase()
    .split(" ")
    .join("");
  let condensedStudentResponse = studentResponse
    .toLowerCase()
    .split(" ")
    .join("");
};
