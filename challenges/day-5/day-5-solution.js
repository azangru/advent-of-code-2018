import {
  calculateFinalPolymerLength,
  findShortestAfterModification
} from './day-5';

import { readInput } from './day-5-helpers';

// the solutions are probably very inefficient, because they take a long time to run
function solvePuzzle() {
  console.log('Solution to the first part of day 5 is', calculateFinalPolymerLength(readInput()));
  console.log('Solution to the second part of day 5 is', findShortestAfterModification(readInput()));
}

solvePuzzle();
