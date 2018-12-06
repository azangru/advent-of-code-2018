import { last, take } from 'ramda';

export function calculateFinalPolymerLength(polymer) {
  const reducedPolymer = reducePolymer(polymer);
  return reducedPolymer.length;
}

export function findShortestAfterModification(polymer) {
  const allUnitTypes = getAllUnitTypes(polymer);

  let shortestLength = Infinity;

  allUnitTypes.forEach(unit => {
    const regex = new RegExp(unit, 'gi');
    const modifiedPolymer = polymer.replace(regex, '');
    const reducedLength = reducePolymer(modifiedPolymer).length;
    if (reducedLength < shortestLength) {
      shortestLength = reducedLength;
    }
  });

  return shortestLength;
}

function reducePolymer(polymer) {
  let hasReachedFinalLength = false;
  let tempPolymer;

  while (!hasReachedFinalLength) {
    tempPolymer = polymer.split('').reduce((result, current) => {
      if (result.length && areSameLettersOfDifferentRegister(last(result), current)) {
        return take(result.length - 1, result);
      } else {
        return [...result, current];
      }
    }, []).join('');

    if (tempPolymer.length !== polymer.length) {
      polymer = tempPolymer;
    } else {
      hasReachedFinalLength = true;
    }
  }

  return polymer;
}

function areSameLettersOfDifferentRegister(letter1, letter2) {
  return (letter1 !== letter2) && (letter1.toLowerCase() === letter2.toLowerCase());
}

function getAllUnitTypes(polymer) {
  let result = new Set();

  polymer.split('').forEach((letter) => {
    if (!result.has(letter.toLowerCase())) {
      result.add(letter.toLowerCase());
    }
  });

  return result;
}
