import { buildGrid, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './build-grid';

const main = () => {
  const grid = buildGrid(1133);

  // FIRST PART OF THE PUZZLE
  // const maxSquareCoord = findMaxSquare(grid);
  // console.log('maxSquareCoord', maxSquareCoord);

  // SECOND PART OF THE PUZZLE
  const maxSquareCoord = findArbitraryMaxSquare(grid);
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

export const findArbitraryMaxSquare = (grid) => {
  let result = { x: 0, y: 0, size: 0, sum: 0 };
  const gridSideSize = grid.length;

  for (let x = 0; x < gridSideSize; x++) {
    for (let y = 0; y < gridSideSize; y++) {
      const currentLargest = findLargestSquareAtOrigin(x, y, grid);
      if (currentLargest.sum > result.sum) {
        result = { x: x + 1, y: y + 1, sum: currentLargest.sum, size: currentLargest.size };
      }
    }
  }

  return result;
};

const findLargestSquareAtOrigin = (x, y, grid) => {
  let result = { sum: 0, size: 0 };
  let currentSum = 0;
  for (let m = x; m < grid.length; m++) {
    const sideLength = m - x + 1;
    currentSum += calculateSemiPerimeter(x, y, sideLength, grid);
    if (currentSum > result.sum) {
      result = { sum: currentSum, size: sideLength };
    }
  }
  return result;
};

const calculateSemiPerimeter = (xLeftTop, yLeftTop, size, grid) => {
  let sum = 0;
  const x = xLeftTop + size - 1;
  const y = yLeftTop + size - 1;
  for (let m = xLeftTop; m < x; m++) {
    sum += grid[m][y];
  }
  for (let n = yLeftTop; n < y; n++) {
    sum += grid[x][n];
  }
  sum += grid[x][y];
  return sum;
};


main();
