import fs from 'fs';
import path from 'path';

export function readInput() {
  const fileName = path.resolve(__dirname, 'day-1-input.txt');
  const rawInput = fs.readFileSync(fileName).toString('UTF-8');
  return rawInput.split('\n')
    .map(number => parseInt(number, 10))
    .filter((item) => !isNaN(item));
}
