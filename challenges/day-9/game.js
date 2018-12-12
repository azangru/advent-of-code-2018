import { range, insert } from 'ramda';

class Game {

  constructor({ numPlayers, lastMarbleScore }) {
    this.scoreboard = this.generateScoreboard(numPlayers);
    this.marbles = this.generateMarbles(lastMarbleScore);
    this.numPlayers = numPlayers;
  }

  generateScoreboard(numPlayers) {
    return range(0, numPlayers)
      .reduce((map, number) => {
        map.set(number + 1, 0);
        return map;
      }, new Map());
  }

  generateMarbles(lastMarbleScore) {
    return range(0, lastMarbleScore + 1);
  }

  play() {
    let circle = [], lastAddedIndex;
    let currentPlayer = 0;

    for (let marble of this.marbles) {
      const step = this.addMarble(circle, lastAddedIndex, marble);
      circle = step.circle;
      lastAddedIndex = step.lastAddedIndex;

      currentPlayer = (currentPlayer + 1) % this.numPlayers !== 0 ?
        (currentPlayer + 1) % this.numPlayers : this.numPlayers;
      if (step.score) {
        const prevScore = this.scoreboard.get(currentPlayer);
        this.scoreboard.set(currentPlayer, prevScore + step.score);
      }
    }
  }

  addMarble(circle, lastAddedIndex, marble) {
    if (!circle.length) {
      return {
        circle: [marble],
        lastAddedIndex: 0
      };
    } else if (marble % 23 === 0) {
      const indexOfCounterclockwiseMarble = this.findIndexOfCouterclockwiseMarble(circle, lastAddedIndex);
      const removedCounterclockwiseMarble = circle[indexOfCounterclockwiseMarble];
      const newCircle = [
        ...circle.slice(0, indexOfCounterclockwiseMarble),
        ...circle.slice(indexOfCounterclockwiseMarble + 1)
      ];
      return {
        circle: newCircle,
        lastAddedIndex: indexOfCounterclockwiseMarble,
        score: marble + removedCounterclockwiseMarble
      };
    } else {
      let newIndex = (lastAddedIndex + 2) % circle.length;
      if (newIndex === 0) {
        newIndex = circle.length;
      }
      const newCircle = insert(newIndex, marble, circle);
      return {
        circle: newCircle,
        lastAddedIndex: newIndex
      };
    }
  }

  findIndexOfCouterclockwiseMarble(circle, lastAddedIndex) {
    let result = lastAddedIndex - 7;
    if (result < 0) {
      result = circle.length + result;
    }
    return result;
  }

  getMaximumScore() {
    return Math.max(...this.scoreboard.values());
  }
}

export default Game;
