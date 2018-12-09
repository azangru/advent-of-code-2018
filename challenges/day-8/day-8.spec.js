import {
  performFirstCheck,
  performSecondCheck
} from './day-8';

const sampleInput = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'
  .split(' ');

describe('performFirstCheck', () => {

  test('parses out metadata entries and sums them up', () => {
    expect(performFirstCheck(sampleInput)).toEqual(138);
  });

});

describe('performSecondCheck', () => {

  test('looks up child nodes based on metadata and sums their values', () => {
    expect(performSecondCheck(sampleInput)).toEqual(66);
  });

});
