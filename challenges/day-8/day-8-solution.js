import {
  performFirstCheck,
  performSecondCheck
} from './day-8';

import { readInput } from './day-8-helpers';

function solvePuzzle() {
  console.log('Solution to the first part of day 8 is', performFirstCheck(readInput()));
  console.log('Solution to the second part of day 8 is', performSecondCheck(readInput()));
}

solvePuzzle();
