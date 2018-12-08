import {
  getCorrectSequenceOfSteps,
  calculateTimeForParallelWork
} from './day-7';

import { readInput } from './day-7-helpers';

function solvePuzzle() {
  console.log('Solution to the first part of day 7 is', getCorrectSequenceOfSteps(readInput()));
  console.log('Solution to the second part of day 7 is', calculateTimeForParallelWork(readInput(), 60, 5));
}

solvePuzzle();
