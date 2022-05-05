import { ValidationTypes } from '../validators/TimesheetDayValidator';

export function formatValidation(validation: ValidationTypes): string {
  switch (validation) {
    case ValidationTypes.DUPLICATED_DATE:
      return 'There are other dates with the same date as this one';
    case ValidationTypes.UNORDERED_TIME_INTERVALS:
      return 'The time intervals are out of order';
  }
}
