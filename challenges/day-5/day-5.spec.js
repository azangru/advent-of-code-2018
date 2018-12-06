import {
  calculateFinalPolymerLength,
  findShortestAfterModification
} from './day-5';

describe('calculateFinalPolymerLength', () => {

  test('finds the length of the polymer after its units have reacted with each other', () => {
    expect(calculateFinalPolymerLength('aA')).toEqual(0);
    expect(calculateFinalPolymerLength('abBA')).toEqual(0);
    expect(calculateFinalPolymerLength('abAB')).toEqual(4);
    expect(calculateFinalPolymerLength('aabAAB')).toEqual(6);
    expect(calculateFinalPolymerLength('dabAcCaCBAcCcaDA')).toEqual(10);
  });

});

describe('findShortestAfterModification', () => {

  test('finds the shortest reduced polymer after removing one of its unit types', () => {
    expect(findShortestAfterModification('dabAcCaCBAcCcaDA')).toEqual(4);
  });

});
