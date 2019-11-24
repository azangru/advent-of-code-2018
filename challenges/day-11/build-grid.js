import { calculateCellPower } from './power-calculator';

export const NUMBER_OF_ROWS = 300;
export const NUMBER_OF_COLUMNS = 300;

export const buildGrid = (gridSerialNumber) => {
  const grid = [...Array(NUMBER_OF_ROWS)]
    .map(() => [...Array(NUMBER_OF_COLUMNS)]);

  for (let x = 1; x <= NUMBER_OF_ROWS; x++) {
    for (let y = 1; y <= NUMBER_OF_COLUMNS; y++) {
      grid[x - 1][y - 1] = calculateCellPower({ x, y }, gridSerialNumber);
    }
  }

  return grid;
};
