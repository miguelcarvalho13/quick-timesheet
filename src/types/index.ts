export interface TimesheetDay {
  date: Date;
  timeIntervals: TimeInterval[]
}

export type Minutes = number;

export interface TimeInterval {
  start: Date;
  end: Date;
  duration: Minutes
}
