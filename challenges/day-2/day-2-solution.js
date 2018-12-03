import {
  calculateChecksum,
  findSameLettersOfClosestStrings
} from './day-2';

import { readInput } from './day-2-helpers';

function solveFirstPuzzle() {
  const input = readInput();
  const solution = calculateChecksum(input);
  console.log('Solution to the first part of day 2 is', solution);
}

function solveSecondPuzzle() {
  const input = readInput();
  const solution = findSameLettersOfClosestStrings(input);
  console.log('Solution to the second part of day 2 is', solution);
}

solveFirstPuzzle();
solveSecondPuzzle();
