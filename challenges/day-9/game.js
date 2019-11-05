import { range } from 'ramda';

import Circle from './circle';

class Game {

  constructor({ numPlayers, lastMarbleScore }) {
    this.scoreboard = this.generateScoreboard(numPlayers);
    this.marblesCount = lastMarbleScore;
    this.numPlayers = numPlayers;
  }

  generateScoreboard(numPlayers) {
    return range(0, numPlayers)
      .reduce((map, number) => {
        map.set(number + 1, 0);
        return map;
      }, new Map());
  }

  play() {
    let circle = new Circle();
    let currentPlayer = 0;

    circle.add(0);
    for (let marble = 1; marble < this.marblesCount + 1; marble++) {
      const moveScore = circle.add(marble);

      currentPlayer = (currentPlayer + 1) % this.numPlayers !== 0 ?
        (currentPlayer + 1) % this.numPlayers : this.numPlayers;

      const prevScore = this.scoreboard.get(currentPlayer);
      this.scoreboard.set(currentPlayer, prevScore + moveScore);
    }
  }

  getMaximumScore() {
    return Math.max(...this.scoreboard.values());
  }
}

export default Game;
