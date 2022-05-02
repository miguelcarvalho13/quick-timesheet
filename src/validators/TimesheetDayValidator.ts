import dayjs from "dayjs";
import TimesheetDay from "../models/TimesheetDay";

export enum ValidationTypes {
  DUPLICATED_DATE,
  UNORDERED_TIME_INTERVALS,
}

/**
 * Retrieves a map containing as keys TimesheetDay objects and as valus a set of
 * issues (ValidationTypes).
 */
export default function getValidations(
  timesheetDays: TimesheetDay[]
): Map<TimesheetDay, Set<ValidationTypes>> {
  const validations = new Map<TimesheetDay, Set<ValidationTypes>>();

  // TODO: Investigate if there's a performance issue here regarding the multiple iterations
  timesheetDays.forEach((timesheetDay) => {
    const validationsFound = new Set<ValidationTypes>();

    // checks for duplicated dates
    if (hasDuplicatedDate(timesheetDays, timesheetDay)) {
      validationsFound.add(ValidationTypes.DUPLICATED_DATE);
    }

    // checks for out of order intervals
    if (hasOutOfOrderIntervals(timesheetDay)) {
      validationsFound.add(ValidationTypes.UNORDERED_TIME_INTERVALS);
    }

    if (validationsFound.size) {
      validations.set(timesheetDay, validationsFound);
    }
  });

  return validations;
}

function hasDuplicatedDate(
  timesheetDays: TimesheetDay[],
  subject: TimesheetDay
): boolean {
  const datesWithoutSubject = timesheetDays
    .filter((d) => d !== subject)
    .map((d) => d.date);

  return datesWithoutSubject
    .some(((date) => dayjs(date).isSame(subject.date, 'date')));
}

function hasOutOfOrderIntervals(timesheetDay: TimesheetDay): boolean {
  const intervals = timesheetDay.intervalsAsEntries;

  return intervals.some((currentInterval, index) => {
    // skip first item since there's no item before it
    if (index < 1) return false;

    const previousInterval = intervals[index - 1];

    return dayjs(currentInterval).isBefore(previousInterval);
  })
}
