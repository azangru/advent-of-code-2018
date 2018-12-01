export function summarizeAnomalyFrequency(frequencies) {
  return findTotal(frequencies);
}

function findTotal(frequencies) {
  return frequencies.reduce((sum, current) => sum + current, 0);
}

export function findFirstRepeatedTotal(frequencies, total, set = new Set, duplicateFound = false) {
  if (duplicateFound) {
    return total;
  } else {
    const updated = findTotalWhileNoDuplicates(frequencies, total, set);
    const { set: updatedSet, duplicateFound: updatedDuplicateFound, total: updatedTotal } = updated;
    return findFirstRepeatedTotal(frequencies, updatedTotal, updatedSet, updatedDuplicateFound);
  }
}

function findTotalWhileNoDuplicates(list, total, set) {
  total = typeof total === 'number' ? total : 0;
  let duplicateFound = false;
  for (let i of list) {
    if (set.has(total)) {
      duplicateFound = true;
      break;
    } else {
      set.add(total);
      total += i;
    }
  }

  return {
    total,
    set,
    duplicateFound
  };
}
