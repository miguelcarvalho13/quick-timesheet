import TimesheetDay from "../models/TimesheetDay";
import { formatDay, formatDuration, formatExtraHours, formatHourOfDay, formatTotalHours } from "./DateTime";

describe('formatDuration', () => {
  test('converts minutes to H[m] m[m] format', () => {
    expect(formatDuration(72)).toBe('1h 12m');
  });

  test('converts 0 minutes to H[m] m[m] format', () => {
    expect(formatDuration(0)).toBe('0h 0m');
  });

  test('converts 10 minutes to H[m] m[m] format', () => {
    expect(formatDuration(10)).toBe('0h 10m');
  });
});

describe('formatHourOfDay', () => {
  test('converts date to HH:mm format', () => {
    expect(formatHourOfDay(new Date('2022-04-29 11:45'))).toBe('11:45');
  });

  test('converts date to HH:mm format displaying leading zeroes', () => {
    expect(formatHourOfDay(new Date('2022-04-29 08:05'))).toBe('08:05');
  });
});

describe('formatDay', () => {
  test('converts date to DD/MM/YYYY format', () => {
    expect(formatDay(new Date('2022-04-29 00:00'))).toBe('29/04/2022');
  });
});

describe('formatTotalHours', () => {
  test('converts list of TimesheetDay duration to H[m] m[m] format', () => {
    const days = TimesheetDay.parse(`
      29/04/2022
      08:15-09:15

      30/04/2022
      07:10-12:45
      13:44-17:30
    `);

    expect(formatTotalHours(days)).toBe('10h 21m');
  });
});

describe('formatExtraHours', () => {
  test('converts TimesheetDay[] extra time to +H[m] m[m] format', () => {
    const days = TimesheetDay.parse(`
      29/04/2022
      08:15-17:15

      30/04/2022
      07:10-16:40
    `);

    expect(formatExtraHours(days)).toBe('+2h 30m');
  });

  test('converts TimesheetDay[] extra time to -H[m] m[m] format', () => {
    const days = TimesheetDay.parse(`
      29/04/2022
      08:15-15:15

      30/04/2022
      07:10-14:40
    `);

    expect(formatExtraHours(days)).toBe('-1h 30m');
  });

  test('converts TimesheetDay[] extra time (6h/day) to +H[m] m[m] format', () => {
    const days = TimesheetDay.parse(`
      29/04/2022
      08:15-15:15

      30/04/2022
      07:10-14:40
    `);

    expect(formatExtraHours(days, 6*60)).toBe('+2h 30m');
  });
});
