import dayjs from 'dayjs';
import TimesheetDay from '../models/TimesheetDay';
import { sumAll } from '../utils/Array';

export default {
  formatDuration(min: number): string {
    return dayjs.duration(min, 'minutes').format('H[h] m[m]');
  },

  formatHourOfDay(date: Date): string {
    return dayjs(date).format('HH:mm');
  },

  formatDay(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  },

  formatTotalHours(timehsheetDays: TimesheetDay[]): string {
    const totalMinutes =  sumAll(
      timehsheetDays.map(d => d.totalDurationInMinutes)
    );

    return this.formatDuration(totalMinutes);
  },

  formatExtraHours(
    timesheetDays: TimesheetDay[],
    baseMinutesPerDay = 8 * 60
  ): string {
    const extraMinutes = sumAll(
      timesheetDays.map(d => d.getExtraMinutesMade(baseMinutesPerDay))
    );
    const sign = extraMinutes < 0 ? '-' : '+';

    return `${sign}${this.formatDuration(Math.abs(extraMinutes))}`;
  },
}
