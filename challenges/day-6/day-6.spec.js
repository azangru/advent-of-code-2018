import dedent from 'dedent';

import {
  calculateLargestArea,
  findAreaConnectedToAllGivenCoordinates
} from './day-6';

const sampleInput = dedent`
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`;

describe('calculateLargestArea', () => {

  test('calculates which of the coordinates has the largest non-infinite area around them', () => {
    const input = sampleInput.split('\n');

    expect(calculateLargestArea(input)).toEqual(17);
  });

});

describe('findAreaConnectedToAllGivenCoordinates', () => {

  test('returns the size of area whose locations are within a given distance from all coordinates', () => {
    const input = sampleInput.split('\n');

    expect(findAreaConnectedToAllGivenCoordinates(input, 32)).toEqual(16);
  });

});
