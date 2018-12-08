import dedent from 'dedent';

import {
  getCorrectSequenceOfSteps,
  calculateTimeForParallelWork
} from './day-7';

const sampleInput = dedent`
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`;

describe('getCorrectSequenceOfSteps', () => {

  test('returns correct sequence of steps', () => {
    const input = sampleInput.split('\n');
    expect(getCorrectSequenceOfSteps(input)).toBe('CABDFE');
  });

});

describe('calculateTimeForParallelWork', () => {

  test('returns time required to finish steps with given number of workers', () => {
    const input = sampleInput.split('\n');
    expect(calculateTimeForParallelWork(input, 0, 2)).toBe(15);
  });

});
