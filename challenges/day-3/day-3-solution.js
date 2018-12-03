import {
  findOverlaps,
} from './day-3';

import { readInput } from './day-3-helpers';


function solvePuzzle() {
  const instructions = readInput();
  // the fabric is a square at least 1000 x 1000 inches
  const fabricSideSize = 1000;
  const solution = findOverlaps(instructions, fabricSideSize);
  console.log('Solution to the first part of day 3 is', solution.overlapsCount);
  console.log('Solution to the second part of day 3 is', solution.nonOverlappingId);
}

solvePuzzle();
