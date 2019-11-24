export const calculateCellPower = (cell, serialNumber) => {
  const { x, y } = cell;
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  const powerLevelString = `${powerLevel}`;
  const hundredsDigit = powerLevelString[powerLevelString.length - 3] || 0;
  return parseInt(hundredsDigit, 10) - 5;
};
