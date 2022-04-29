import dayjs from 'dayjs';
import { TimeInterval } from '../types';
import { sumAll } from '../utils/Array';

export default class TimesheetDay {
  date: Date;
  timeIntervals: TimeInterval[];

  constructor(date: Date, timeIntervals: TimeInterval[]) {
    this.date = date;
    this.timeIntervals = timeIntervals;
  }

  get intervalsAsEntries(): Date[] {
    return this.timeIntervals.flatMap(({ start, end }) => [start, end]);
  }

  get totalDurationInMinutes(): number {
    return sumAll(this.timeIntervals.map(({ duration }) => duration));
  }

  /**
   * Retrieves the amount of extra minutes made in this day. Taking as a
   * parameter a base amount of minutes which by default is the equivalent of 8h
   * per day.
   */
  getExtraMinutesMade(baseMinutesPerDay = 8 * 60): number {
    return this.totalDurationInMinutes - baseMinutesPerDay;
  }

  static parse(text: string): TimesheetDay[] {
    function createTimesheetDay([dateString, ...intervalsList]: string[]): TimesheetDay {
      const date = dayjs(dateString, 'DD/MM/YYYY').toDate();
      const timeIntervals = intervalsList
        .map((s) => s.split('-'))
        .map(([s0, s1]) => {
          const start = dayjs(`${dateString} ${s0}`, 'DD/MM/YYYY HH:mm')
          const end = dayjs(`${dateString} ${s1}`, 'DD/MM/YYYY HH:mm')
          const duration = end.diff(start, 'minute')

          return { start: start.toDate(), end: end.toDate(), duration }
        })

      return new TimesheetDay(date, timeIntervals);
    }

    return text
      .trim()
      .split('\n\n')
      .map(s => s.split('\n'))
      .map(createTimesheetDay)
  }
}
