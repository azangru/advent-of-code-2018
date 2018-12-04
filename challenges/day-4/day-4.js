import {
  prop,
  range,
  sortBy
} from 'ramda';

export function useStrategy1(input) {
  const processedInput = transformToDays(processInput(input));
  const [sleepiestGuardId] = findGuardWhoSleepsMost(processedInput);
  const mostSleptMinute = findMostSleptMinute(processedInput, sleepiestGuardId);
  return sleepiestGuardId * mostSleptMinute;
}

export function useStrategy2(input) {
  const processedInput = transformToDays(processInput(input));
  const { guardId, minute } = findMostFrequentlySleptMinute(processedInput);
  return guardId * minute;
}

// rules:
// 1 guard per day
// only interested in 00 hour

function processInput(input) {
  // input is an array of strings
  return sortBy(prop('dateTime'))(input.map(parseString));
}

function transformToDays(parsedData) {
  const days = [];
  let currentDay;
  let minuteStartSleep;
  let minuteEndSleep;

  parsedData.forEach(data => {
    if (data.action === 'begins shift') {
      currentDay && days.push(currentDay);
      currentDay = createNewDay(data);
      minuteStartSleep = 0;
      minuteEndSleep = 0;
    } else if (data.action === 'falls asleep') {
      minuteStartSleep = data.minute;
    } else if (data.action === 'wakes up') {
      minuteEndSleep = data.minute;
      for (let i = minuteStartSleep; i < minuteEndSleep; i++) {
        currentDay.minutes[i] = 1;
      }
    }
  });
  days.push(currentDay); // last day
  return days;
}

function parseString(string) {
  const dateString = string.match(/\[(.+)\]/)[1];
  const dateTime = new Date(dateString);
  const guardIdMatch = string.match(/Guard #(\d+)/);
  const guardId = guardIdMatch && guardIdMatch[1];
  const action = string.match(/(begins shift)|(falls asleep)|(wakes up)/)[0];

  return {
    dateTime,
    day: dateTime.getDate(),
    hour: dateTime.getHours(),
    minute: dateTime.getMinutes(),
    guardId,
    action
  };
}

function createNewDay(data) {
  const startMinute = data.hour === 0 ? data.minute : 0;
  const minutes = range(0, 60).map(() => 0);

  return {
    guardId: data.guardId,
    startMinute,
    minutes
  };
}

function findGuardWhoSleepsMost(days) {
  const sleepTimes = new Map();

  days.forEach(day => {
    const { guardId } = day;
    const minutesAsleep = day.minutes.reduce((result, minute) => {
      return minute === 1 ? result + 1 : result;
    }, 0);

    if (sleepTimes.has(guardId)) {
      sleepTimes.set(guardId, sleepTimes.get(guardId) + minutesAsleep);
    } else {
      sleepTimes.set(guardId, minutesAsleep);
    }
  });

  return [...sleepTimes.entries()].reduce((result, current) => {
    const [, maxValue] = result;
    const [, currentValue] = current;

    return currentValue > maxValue ? current : result;
  });
}

function findMostSleptMinute(processedInput, sleepiestGuardId) {
  let sumSlept = 0;
  let result = 0;
  const referenceMinutes = range(0, 60);

  const minutes = processedInput
    .filter(({ guardId }) => guardId === sleepiestGuardId)
    .map(prop('minutes'));

  for (let m of referenceMinutes) {
    const sum = minutes.reduce((acc, minute) => {
      return acc + minute[m];
    }, 0);
    if (sum > sumSlept) {
      sumSlept = sum;
      result = m;
    }
  }
  return result;
}

function findMostFrequentlySleptMinute(processedInput) {
  const groupedByGuard = new Map();
  const referenceMinutes = range(0, 60);

  // first, group the data by guard ids
  processedInput.forEach(data => {
    const { guardId } = data;
    if (groupedByGuard.has(guardId)) {
      groupedByGuard.set(guardId, { minutes: groupedByGuard.get(guardId).minutes.concat([data.minutes]) });
    } else {
      groupedByGuard.set(guardId, { minutes: [data.minutes] });
    }
  });

  // then, looping over guards, find for each guard which minute he slept most frequently on
  groupedByGuard.forEach((data, id) => {
    let minute = 0;
    let times = 0;
    referenceMinutes.forEach(refMinute => {
      const timesSlept = data.minutes.reduce((acc, minutes) => {
        return acc + minutes[refMinute];
      }, 0);
      if (timesSlept > times) {
        times = timesSlept;
        minute = refMinute;
      }
    });
    groupedByGuard.set(id, { minute, times });
  });

  // then find the guard who slept most frequently on the same minute
  const max = [...groupedByGuard.entries()].reduce((result, current) => {
    if (current[1].times > result[1].times) {
      return current;
    } else {
      return result;
    }
  });

  return {
    guardId: max[0],
    minute: max[1].minute
  };
}
