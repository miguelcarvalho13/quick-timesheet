import dayjs from 'dayjs';
import { TimeInterval } from '../types';

export default class TimesheetDay {
  date: Date;
  timeIntervals: TimeInterval[];

  constructor(date: Date, timeIntervals: TimeInterval[]) {
    this.date = date;
    this.timeIntervals = timeIntervals;
  }

  get intervalsAsEntries(): Date[] {
    return this.timeIntervals.flatMap((interval) => [interval.start, interval.end]);
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
