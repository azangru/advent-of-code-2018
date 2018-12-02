export function calculateChecksum(strings) {
  return countWithNumberOfSameLetters(strings, 2)
    * countWithNumberOfSameLetters(strings, 3);
}

// assumption: there is only one pair of strings in the input that is different
// in only 1 letter in the same position
export function findSameLettersOfClosestStrings(strings) {
  // should return same letters of strings that differ from each other
  // only by 1 letter in the same position
  return findStringsWithASingleDifferingLetter(strings);
}

function countWithNumberOfSameLetters(strings, number) {
  return strings.reduce((count, string) => {
    if (hasNumberOfSameLetters(string, number)) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
}

function hasNumberOfSameLetters(string, number) {
  const letters = string.split('');
  const lettersCount = letters.reduce((map, letter) => {
    const count = map.get(letter) || 0;
    map.set(letter, count + 1);
    return map;
  }, new Map());
  const counts = [...lettersCount.values()];
  return counts.some(count => count === number);
}

function findStringsWithASingleDifferingLetter(strings) {
  let result = [];
  strings.forEach((string, index) => {
    for (let i = index + 1; i < strings.length; i++) {
      const comparisonString = strings[i];
      if (getNumberOfDifferentLetters(string, comparisonString) === 1) {
        result = getCommonLetters(string, comparisonString);
      }
    }
  });
  return result;
}

function getNumberOfDifferentLetters(string1, string2) {
  // assumption: the number of letters in both strings is the same
  let result = 0;
  string1.split('').forEach((letter, index) => {
    if (string2[index] !== letter) {
      result++;
    }
  });
  return result;
}

function getCommonLetters(string1, string2) {
  return string1.split('').reduce((result, letter, index) => {
    if (string2[index] === letter) {
      return result + letter;
    } else {
      return result;
    }
  }, '');
}
