import {
  range,
  sort,
  take,
  last,
  not,
  isNil,
  filter,
  uniq,
  compose,
  without,
  flatten
} from 'ramda';

export function calculateLargestArea(input) {
  const coordinates = parseData(input);
  const [ gridWidth, gridHeight ] = getGridDimensions(coordinates);
  const grid = createGrid(gridWidth, gridHeight);
  fillGrid(grid, coordinates);
  const coordinatesWithFiniteAreas = filterInfiteAreas(grid, coordinates);
  return findLargestFiniteArea(grid, coordinatesWithFiniteAreas);
}

export function findAreaConnectedToAllGivenCoordinates(input, distance) {
  const coordinates = parseData(input);
  const [ gridWidth, gridHeight ] = getGridDimensions(coordinates);
  const grid = createGrid(gridWidth, gridHeight);
  fillGridAlternate(grid, coordinates, distance);

  const areaSize = flatten(grid).reduce((result, item) => {
    return item ? result + 1 : result;
  }, 0);
  return areaSize;
}

// the input is an array of strings, each string representing the x and the y coordinates
// as comma-separated numbers
function parseData(arr) {
  return arr.map(string => string.split(', '))
    .map(coordinates => coordinates.map(Number));
}

// find the width and the height of the grid where to plot coordinates
function getGridDimensions(coordinates) {
  return coordinates.reduce((result, current) => {
    const [ maxWidth, maxHeight ] = result;
    const [ currentWidth, currentHeight ] = current;
    return [
      currentWidth > maxWidth ? currentWidth : maxWidth,
      currentHeight > maxHeight ? currentHeight : maxHeight
    ];
  }, [0, 0]);
}

function createGrid(width, height) {
  return range(0, width + 1)
    .map(() => [...Array(height + 1)]);
}

// fills grid on the basis of which of the given coordinates
// each individual cell is the closest to
function fillGrid(grid, coordinates) {
  for (let x of range(0, grid.length)) { // columns
    for (let y of range(0, grid[0].length)) { // rows
      const coordinateId = getClosestCoordinate([x, y], coordinates);
      grid[x][y] = coordinateId;
    }
  }
}

// marks as true the cells of the grid whose Manhattan distance to all given coordinates
// is less than the provided maximum distance
function fillGridAlternate(grid, coordinates, maxDistance) {
  for (let x of range(0, grid.length)) { // columns
    for (let y of range(0, grid[0].length)) { // rows
      grid[x][y] = isWithinDistance([x, y], coordinates, maxDistance);
    }
  }
}

function getClosestCoordinate(current, coordinates) {
  // remember that we need to consider cases when a coordinate is equidistant
  // from two other coordinates
  const map = new Map();

  coordinates.forEach((coordinate, index) => {
    map.set(index, findManhattanDistance(current, coordinate));
  });

  const sortedDistances = sort(([, distance1], [, distance2]) => {
    if (distance1 === distance2) return 0;
    return distance1 < distance2 ? -1 : 1;
  })([...map.entries()]);

  const sampled = take(2, sortedDistances);

  const isEquidistant = sampled[0][1] === sampled[1][1];
  return isEquidistant ? null : sampled[0][0]; // return either the index of the closest coordinate or a null as a filler
}

function isWithinDistance(location, coordinates, maxTotalDistance) {
  const totalDistance = coordinates.reduce((result, coordinate) => {
    return result + findManhattanDistance(location, coordinate);
  }, 0);

  return totalDistance < maxTotalDistance;
}

function findManhattanDistance(coordinate1, coordinate2) {
  const [ x1, y1 ] = coordinate1;
  const [ x2, y2 ] = coordinate2;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// return a list of coordinates that do not have tied closest coordinates on the border of the grid
function filterInfiteAreas(grid, coordinates) {
  const coordinateIds = coordinates.map((coordinate, index) => index);
  const coordinatesOnPerimeter = [
    ...grid[0], // left column
    ...last(grid), //right column
    ...grid.map(column => column[0]), // top row
    ...grid.map(column => last(column)) // bottom row
  ];
  const isNotNull = compose(
    not,
    isNil
  );
  const coordinatesToExclude = compose(
    uniq,
    filter(isNotNull)
  )(coordinatesOnPerimeter);
  return without(coordinatesToExclude, coordinateIds);
}

function findLargestFiniteArea(grid, ids) {
  const map = new Map(ids.map(id => [id, 0]));

  grid.forEach(column => {
    column.forEach(cell => {
      if (ids.includes(cell)) {
        map.set(cell, map.get(cell) + 1);
      }
    });
  });

  return [...map.entries()].reduce((maxValue, [, currentValue]) => {
    return currentValue > maxValue ? currentValue : maxValue;
  }, 0);
}
