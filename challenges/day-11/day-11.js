import { buildGrid, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './build-grid';

const main = () => {
  const grid = buildGrid(1133);
  const maxSquareCoord = findMaxSquare(grid);
  console.log('maxSquareCoord', maxSquareCoord);
};


export const findMaxSquare = (grid) => {
  let result = { x: 0, y: 0, sum: 0 };

  for (let x = 0; x <= NUMBER_OF_ROWS - 3; x++) {
    for (let y = 0; y <= NUMBER_OF_COLUMNS - 3; y++) {
      const sum = calculate3By3(x, y, grid);
      if (sum > result.sum) {
        result = { x: x + 1, y: y + 1, sum };
      }
    }
  }

  return result;
};

const calculate3By3 = (x, y, grid) => {
  let sum = 0;
  for (let m = x; m < x + 3; m++) {
    for (let n = y; n < y + 3; n++) {
      sum += grid[m][n];
    }
  }
  return sum;
};

main();
