import {
  findWinningScore,
} from './day-9';

const game1 = {
  numPlayers: 428,
  lastMarbleScore: 72061
};

const game2 = {
  numPlayers: 428,
  lastMarbleScore: 72061 * 100
};

function solvePuzzle() {
  console.log('Solution to the first part of day 8 is', findWinningScore(game1));
  console.log('Solution to the first part of day 8 is', findWinningScore(game2));
}

solvePuzzle();
