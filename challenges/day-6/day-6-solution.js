import {
  calculateLargestArea,
} from './day-6';

import { readInput } from './day-6-helpers';

// the solutions are probably very inefficient, because they take a long time to run
function solvePuzzle() {
  console.log('Solution to the first part of day 6 is', calculateLargestArea(readInput()));
  // console.log('Solution to the second part of day 5 is', findShortestAfterModification(readInput()));
}

solvePuzzle();
