import TimesheetDay from "../models/TimesheetDay";

const sample1 = new TimesheetDay(
  new Date('2022-04-29 00:00'),
  [
    {
      duration: 60,
      start: new Date('2022-04-29 09:15'),
      end: new Date('2022-04-29 10:15'),
    },
  ]
);
const sample2 = new TimesheetDay(
  new Date('2022-04-30 00:00'),
  [
    {
      duration: 3 * 60,
      start: new Date('2022-04-30 07:10'),
      end: new Date('2022-04-30 10:10'),
    },
    {
      duration: 3 * 60 + 10,
      start: new Date('2022-04-30 11:05'),
      end: new Date('2022-04-30 14:15'),
    },
  ]
);

describe('parse', () => {
  test('converts string to TimsheetDay[]', () => {
    const parsed = TimesheetDay.parse(`
      29/04/2022
      09:15-10:15

      30/04/2022
      07:10-10:10
      11:05-14:15
    `);

    expect(parsed.length).toBe(2);
    expect(parsed[0]).toEqual(sample1);
    expect(parsed[1]).toEqual(sample2);
  });
});

describe('intervalsAsEntries', () => {
  test('retrieves TimeInterval as a flattened list containing the starts and ends', () => {
    const expected = [
      sample2.timeIntervals[0].start,
      sample2.timeIntervals[0].end,
      sample2.timeIntervals[1].start,
      sample2.timeIntervals[1].end,
    ];

    expect(sample2.intervalsAsEntries).toEqual(expected);
  });
});

describe('totalDurationInMinutes', () => {
  test('retrieves the sum of all durations', () => {
    const { timeIntervals: intervals } = sample2;
    const totalDuration = intervals[0].duration + intervals[1].duration;

    expect(sample2.totalDurationInMinutes).toBe(totalDuration);
  });
});

describe('getExtraMinutesMade', () => {
  test('retrieves the sum of all durations minus a base minutes value (8h/day by default)', () => {
    expect(sample1.getExtraMinutesMade()).toBe(-7 * 60);
  });

  test('retrieves the sum of all durations minus a base minutes value (6h/day)', () => {
    expect(sample1.getExtraMinutesMade(6 * 60)).toBe(-5 * 60);
  });
});
