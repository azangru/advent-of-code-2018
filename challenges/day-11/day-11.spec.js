import { calculateCellPower } from './power-calculator';
import { buildGrid } from './build-grid';
import { findMaxSquare, findArbitraryMaxSquare } from './day-11';

describe('calculateCellPower', () => {

  test('calculates power level fuel cells correctly', () => {
    expect(calculateCellPower({ x: 3, y: 5 }, 8)).toEqual(4);
    expect(calculateCellPower({ x: 122, y: 79 }, 57)).toEqual(-5);
    expect(calculateCellPower({ x: 217, y: 196 }, 39)).toEqual(0);
    expect(calculateCellPower({ x: 101, y: 153 }, 71)).toEqual(4);
  });

});

describe('findMaxSquare', () => {

  test('finds the 3x3 square with the highest sum of values', () => {
    const withSerial18 = buildGrid(18);
    expect(findMaxSquare(withSerial18)).toEqual({ x: 33, y: 45, sum: 29 });

    const withSerial42 = buildGrid(42);
    expect(findMaxSquare(withSerial42)).toEqual({ x: 21, y: 61, sum: 30 });
  });

});

describe('findArbitraryMaxSquare', () => {

  const example1 = [
    [-2,  -4,   4,   4,   4],
    [-4,   4,   4,   4,  -5],
    [4,   3,   3,   4,  -4],
    [1,   1,   2,   4,  -3],
    [-1,  0,   2,  -5,  -2]
  ];

  test('works with example 1', () => {
    expect(findArbitraryMaxSquare(example1)).toEqual({ x: 1, y: 1, sum: 32, size: 4 });
  });

  test('finds square with the largest power', () => {
    // const withSerial18 = buildGrid(18);
    const withSerial42 = buildGrid(42);
    // expect(findArbitraryMaxSquare(withSerial18)).toEqual({ x: 90, y: 269, sum: 113, size: 16 });
    expect(findArbitraryMaxSquare(withSerial42)).toEqual({ x: 232, y: 251, sum: 119, size: 12 });
  });

});
