import {
  summarizeAnomalyFrequency,
  findFirstRepeatedTotal
} from './day-1';

import { readInput } from './day-1-helpers';

function solveFirstPuzzle() {
  const input = readInput();
  const solution = summarizeAnomalyFrequency(input);
  console.log('Solution to the first part of day 1 is', solution);
}

function solveSecondPuzzle() {
  const input = readInput();
  const solution = findFirstRepeatedTotal(input);
  console.log('Solution to the second part of day 1 is', solution);
}

solveFirstPuzzle();
solveSecondPuzzle();
