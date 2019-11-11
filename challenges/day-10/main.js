// import testSource from './source-test.js';
import challenge1 from './source-challenge-1.js';
import parser from './parser.js';
import { initializeCanvas, renderCanvasContent } from './canvas.js';

const parsedSource = parser(challenge1);
const rangeX = parsedSource.reduce((result, point) => {
  let [minX, maxX] = result.x;
  let [minY, maxY] = result.y;
  if (point.position.x < minX) {
    minX = point.position.x;
  }
  if (point.position.x > maxX) {
    maxX = point.position.x;
  }
  if (point.position.y < minY) {
    minY = point.position.y;
  }
  if (point.position.y > maxY) {
    maxY = point.position.y;
  }
  return {
    x: [minX, maxX],
    y: [minY, maxY]
  };
}, { x: [Infinity, -Infinity], y: [Infinity, -Infinity] });

const canvas = initializeCanvas();


const calculateCoordinates = (points, time) => {
  return points.map(point => {
    return {
      x: point.position.x + point.velocity.x * time,
      y: point.position.y + point.velocity.y * time
    };
  });
};

let time = 0;

while (calculateCoordinates(parsedSource, time).some(point => point.x < 0 || point.y < 0)) {
  time++;
}

let interval = setInterval(() => {
  const points = calculateCoordinates(parsedSource, time);
  console.log(JSON.stringify(points[0]));
  renderCanvasContent(points, canvas);
  time++;
}, 1000);


window.addEventListener('click', () => {
  clearInterval(interval);
  console.log('time', time - 1);
});
