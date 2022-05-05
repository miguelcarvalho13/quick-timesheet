import { ValidationTypes } from '../validators/TimesheetDayValidator';
import { formatValidation } from './Validation';

describe('formatValidation', () => {
  test('format ValidationTypes.DUPLICATED_DATE', () => {
    expect(formatValidation(ValidationTypes.DUPLICATED_DATE)).toBe(
      'There are other dates with the same date as this one',
    );
  });

  test('format ValidationTypes.UNORDERED_TIME_INTERVALS', () => {
    expect(formatValidation(ValidationTypes.UNORDERED_TIME_INTERVALS)).toBe(
      'The time intervals are out of order',
    );
  });
});
