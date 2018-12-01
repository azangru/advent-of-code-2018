import {
  summarizeAnomalyFrequency,
  findFirstRepeatedTotal
} from './day-1';

describe('summarizeAnomalyFrequency', () => {

  test('sums up anomaly frequencies', () => {
    const sample1 = ['+1', '+1', '+1'].map((num) => parseInt(num, 10));
    const sample2 = ['+1', '+1', '-2'].map((num) => parseInt(num, 10));
    const sample3 = ['-1', '-2', '-3'].map((num) => parseInt(num, 10));

    expect(summarizeAnomalyFrequency(sample1)).toBe(3);
    expect(summarizeAnomalyFrequency(sample2)).toBe(0);
    expect(summarizeAnomalyFrequency(sample3)).toBe(-6);
  });

});

describe('findFirstRepeatedTotal', () => {

  test('finds first total that was repeated twice', () => {
    const sample1 = ['+1', '-1'].map((num) => parseInt(num, 10));
    const sample2 = ['+3', '+3', '+4', '-2', '-4'].map((num) => parseInt(num, 10));
    const sample3 = ['-6', '+3', '+8', '+5', '-6'].map((num) => parseInt(num, 10));
    const sample4 = ['+7', '+7', '-2', '-7', '-4'].map((num) => parseInt(num, 10));

    expect(findFirstRepeatedTotal(sample1)).toBe(0);
    expect(findFirstRepeatedTotal(sample2)).toBe(10);
    expect(findFirstRepeatedTotal(sample3)).toBe(5);
    expect(findFirstRepeatedTotal(sample4)).toBe(14);
  });

});
