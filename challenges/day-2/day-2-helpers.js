import fs from 'fs';
import path from 'path';

export function readInput() {
  const fileName = path.resolve(__dirname, 'day-2-input.txt');
  const rawInput = fs.readFileSync(fileName).toString('UTF-8');
  return rawInput.split('\n').filter(Boolean);
}
