import dedent from 'dedent';

import {
  calculateLargestArea,
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
