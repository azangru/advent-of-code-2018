import {
  calculateLargestArea,
  findAreaConnectedToAllGivenCoordinates
} from './day-6';

import { readInput } from './day-6-helpers';

function solvePuzzle() {
  console.log('Solution to the first part of day 6 is', calculateLargestArea(readInput()));
  console.log('Solution to the second part of day 6 is', findAreaConnectedToAllGivenCoordinates(readInput(), 10000));
}

solvePuzzle();
