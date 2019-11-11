export const initializeCanvas = () => {
  const container = document.querySelector('main');
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);
  return canvas;
};

export const renderCanvasContent = (points, canvas) => {
  clearCanvas(canvas);

  const center = getCenterCoordinates(canvas);
  points.forEach(point => {
    renderPoint(point, center, canvas);
  });
};

const clearCanvas = (canvas) => {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const renderPoint = (point, centerCoordinates, canvas) => {
  const context = canvas.getContext('2d');
  const squareSide = 1;
  const x = centerCoordinates.x + point.x * squareSide;
  const y = centerCoordinates.y + point.y * squareSide;
  context.fillRect(x, y, squareSide, squareSide);
  // context.fillRect(50, 105, 1000, 1000);
};

const getCenterCoordinates = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect();
  const center = {
    x: Math.round(width / 2),
    y: Math.round(height / 2)
  };
  return center;
};
