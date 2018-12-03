import { prop } from 'ramda';

export function findOverlaps(strings, side) {
  const fabric = generateFabric(side);
  const instructions = strings.map(parseInput);
  const overlapTracker = new Set();
  const instructionIds = instructions.map(prop('id'));

  instructions
    .forEach(instructions => fillRegion(instructions, fabric, overlapTracker));

  const overlapsCount = countOverlaps(fabric);
  const nonOverlappingId = findNonTrackedId(instructionIds, overlapTracker);

  return {
    overlapsCount,
    nonOverlappingId
  };
}

function parseInput(string) {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const parsedInput = regex.exec(string);
  return {
    id: parsedInput[1],
    left: parseInt(parsedInput[2]),
    top: parseInt(parsedInput[3]),
    width: parseInt(parsedInput[4]),
    height: parseInt(parsedInput[5])
  };
}

function generateFabric(side) {
  return [... new Array(side)].map(() => [... new Array(side)]);
}

function fillRegion(instructions, fabric, tracker) {
  const originRow = instructions.top;
  const originColumn = instructions.left;

  for (let x = originRow; x < originRow + instructions.height; x++) {
    for (let y = originColumn; y < originColumn + instructions.width; y++) {
      if (fabric[x][y]) {
        tracker.add(fabric[x][y]);
        tracker.add(instructions.id);
        fabric[x][y] = 'x';
      } else {
        fabric[x][y] = instructions.id;
      }
    }
  }
}

function countOverlaps(fabric) {
  return fabric.map(column => column.reduce((sum, cell) => {
    return cell === 'x' ? sum + 1 : sum;
  }, 0))
  .reduce((sum, count) => { return sum + count; }, 0);
}

// assumption: there is only one untracked id
function findNonTrackedId(ids, tracker) {
  for (let id of ids) {
    if (!tracker.has(id)) {
      return id;
    }
  }
}
