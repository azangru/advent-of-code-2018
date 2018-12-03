import {
  findOverlaps
} from './day-3';

describe('findOverlaps', () => {

  test('counts the number of overlapped inches and returns id of non-overlapping instructions', () => {
    const sample = [
      '#1 @ 1,3: 4x4',
      '#2 @ 3,1: 4x4',
      '#3 @ 5,5: 2x2'
    ];

    const { overlapsCount, nonOverlappingId } = findOverlaps(sample, 8);
    expect(overlapsCount).toEqual(4);
    expect(nonOverlappingId).toEqual('3');
  });

});
