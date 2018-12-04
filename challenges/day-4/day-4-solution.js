import {
  useStrategy1,
  useStrategy2
} from './day-4';

import { readInput } from './day-4-helpers';


function solvePuzzle() {
  console.log('Solution to the first part of day 4 is', useStrategy1(readInput()));
  console.log('Solution to the second part of day 4 is', useStrategy2(readInput()));
}

solvePuzzle();
