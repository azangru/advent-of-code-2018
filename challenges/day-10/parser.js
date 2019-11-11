const parser = (source) => {
  const points = source
    .split('\n')
    .map(point => {
      const [x, y, velocityX, velocityY] = point.match(/(-?\d+)/g).map(num => parseInt(num, 10));
      return {
        position: { x, y },
        velocity: { x: velocityX, y: velocityY }
      };
    });
  return points;
};

export default parser;
