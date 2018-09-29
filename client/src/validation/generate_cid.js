function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const suggest_cid = function() {
  let cid = getRandomIntInclusive(100000, 999999);
  return cid.toString();
};

export default suggest_cid;
