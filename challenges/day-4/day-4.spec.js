import {
  useStrategy1,
  useStrategy2
} from './day-4';

const testInput = `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.split('\n').filter(Boolean);

describe('useStrategy1', () => {

  test('finds id of guard who slept the most and the minute he slept the most and multiplies this', () => {
    // sleepiest guard id should be 10
    // minute he slept the most is 24
    expect(useStrategy1(testInput)).toEqual(240);
  });

});

describe('useStrategy2', () => {

  test('finds id of guard who slept most frequently on the same minute and multiplies it by thi minute', () => {
    // guard who slept on the same minute most frequently (3 times) has id 99
    // minute he slept most frequently on is 45
    expect(useStrategy2(testInput)).toEqual(99 * 45);
  });

});
