import Game from './game';

export function findWinningScore({ numPlayers, lastMarbleScore }) {
  const game = new Game({ numPlayers, lastMarbleScore });
  game.play();
  return game.getMaximumScore();
}
