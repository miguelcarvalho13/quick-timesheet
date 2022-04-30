import dayjs from 'dayjs';
import TimesheetDay from '../models/TimesheetDay';
import { sumAll } from '../utils/Array';

export function formatDuration(minutes: number): string {
  const duration = dayjs.duration(minutes, 'minutes');

  // TODO: find a better/more standard way to handle this
  return `${Math.floor(duration.asHours())}h ${duration.minutes()}m`;
}

export function formatHourOfDay(date: Date): string {
  return dayjs(date).format('HH:mm');
}

export function formatDay(date: Date): string {
  return dayjs(date).format('DD/MM/YYYY');
}

export function formatTotalHours(timehsheetDays: TimesheetDay[]): string {
  const totalMinutes =  sumAll(
    timehsheetDays.map(d => d.totalDurationInMinutes)
  );

  return formatDuration(totalMinutes);
}

export function formatExtraHours(
  timesheetDays: TimesheetDay[],
  baseMinutesPerDay = 8 * 60
): string {
  const extraMinutes = sumAll(
    timesheetDays.map(d => d.getExtraMinutesMade(baseMinutesPerDay))
  );
  const sign = extraMinutes < 0 ? '-' : '+';

  return `${sign}${formatDuration(Math.abs(extraMinutes))}`;
}
