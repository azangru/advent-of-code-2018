import fs from 'fs';
import path from 'path';
import { head } from 'ramda';

export function readInput() {
  const fileName = path.resolve(__dirname, 'day-8-input.txt');
  const rawInput = fs.readFileSync(fileName).toString('UTF-8');
  return head(rawInput.split('\n')).split(' ');
}
