function similar(a, b) {
  let lengthA = a.length;
  let lengthB = b.length;
  let equivalency = 0;
  let minLength = a.length > b.length ? b.length : a.length;
  let maxLength = a.length < b.length ? b.length : a.length;
  for (let i = 0; i < minLength; i++) {
    if (a[i] == b[i]) {
      equivalency++;
    }
  }

  let weight = equivalency / maxLength;
  return weight * 100 + "%";
}
