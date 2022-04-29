import dayjs from 'dayjs';

export default {
  formatMinutes(min: number): string {
    return dayjs.duration(min, 'minutes').format('H[h] m[m]');
  },

  formatHourOfDay(date: Date): string {
    return dayjs(date).format('HH:mm');
  },

  formatDay(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }
}
