function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const suggest_crn = function() {
  let crn = getRandomIntInclusive(1000000, 9999999);
  return crn.toString();
};

export default suggest_crn;
