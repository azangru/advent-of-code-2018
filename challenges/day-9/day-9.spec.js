import {
  findWinningScore
} from './day-9';


describe('findWinningScore', () => {

  test('finds winner’s score', () => {
    const game1 = {
      numPlayers: 9,
      lastMarbleScore: 25
    };
    const game2 = {
      numPlayers: 10,
      lastMarbleScore: 1618
    };
    const game3 = {
      numPlayers: 13,
      lastMarbleScore: 7999
    };
    const game4 = {
      numPlayers: 17,
      lastMarbleScore: 1104
    };
    const game5 = {
      numPlayers: 21,
      lastMarbleScore: 6111
    };
    const game6 = {
      numPlayers: 30,
      lastMarbleScore: 5807
    };

    expect(findWinningScore(game1)).toEqual(32);
    expect(findWinningScore(game2)).toEqual(8317);
    expect(findWinningScore(game3)).toEqual(146373);
    expect(findWinningScore(game4)).toEqual(2764);
    expect(findWinningScore(game5)).toEqual(54718);
    expect(findWinningScore(game6)).toEqual(37305);
  });

});
