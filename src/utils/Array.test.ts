import { sumAll } from './Array';

describe('sumAll', () => {
  test('sums all items in an array', () => {
    expect(sumAll([11, 2])).toBe(13);
  });

  test('returns 0 given an empty array', () => {
    expect(sumAll([])).toBe(0);
  });
});
