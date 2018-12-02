import {
  calculateChecksum,
  findSameLettersOfClosestStrings
} from './day-2';

describe('calculateChecksum', () => {

  test('multiplies the number of strings with 2 same letters by the number of strings with 3 same letters', () => {
    const sample = [
      'abcdef', // no letters repeat 2 or 3 times; counts as 0
      'bababc', // two a's and three b's; counts as 1 + 1
      'abbcde', // two b's; counts as 1
      'abcccd', // three c's; counts as 1
      'aabcdd', // two a's and two d's; counts as 1 (a string with 2 same letters)
      'abcdee', // two e's; counts as 1
      'ababab' // three a's and three b's; counts as 1 (a string with 3 same letters)
    ];

    expect(calculateChecksum(sample)).toBe(12);
  });

});


describe('findSameLettersOfClosestStrings', () => {

  test('finds common letters between closest strings', () => {
    const sample = [
      'abcde',
      'fghij', // <--
      'klmno',
      'pqrst',
      'fguij', // <--
      'axcye',
      'wvxyz'
    ];
    // the arrows above show the strings that differ from each other by
    // only 1 letter in the same position

    expect(findSameLettersOfClosestStrings(sample)).toBe('fgij');
  });

});
