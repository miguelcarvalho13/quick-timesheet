import TimesheetDay from "../models/TimesheetDay";
import getValidations, { ValidationTypes } from "./TimesheetDayValidator";

const sample1 = TimesheetDay.parse(`
  28/04/2022
  08:20-15:00
  16:00-19:15

  29/04/2022
  09:15-13:15
  12:15-17:00

  30/04/2022
  07:10-11:15
  10:15-18:30

  30/04/2022
  07:10-10:10
`);

describe('getValidations', () => {
  test('only contains TimesheetDay objects with issues', () => {
    const validations = getValidations(sample1);

    expect(validations.size).toBe(3);
    expect(validations.has(sample1[0])).toBeFalsy();
    expect(validations.has(sample1[1])).toBeTruthy();
    expect(validations.has(sample1[2])).toBeTruthy();
    expect(validations.has(sample1[3])).toBeTruthy();
  });

  test('identifies duplicated dates', () => {
    const validations = getValidations(sample1);

    expect(validations.get(sample1[1])).not.toContain(ValidationTypes.DUPLICATED_DATE);
    expect(validations.get(sample1[2])).toContain(ValidationTypes.DUPLICATED_DATE);
    expect(validations.get(sample1[3])).toContain(ValidationTypes.DUPLICATED_DATE);
  });

  test('identifies unordered time intervals', () => {
    const validations = getValidations(sample1);

    expect(validations.get(sample1[1])).toContain(ValidationTypes.UNORDERED_TIME_INTERVALS);
    expect(validations.get(sample1[2])).toContain(ValidationTypes.UNORDERED_TIME_INTERVALS);
    expect(validations.get(sample1[3])).not.toContain(ValidationTypes.UNORDERED_TIME_INTERVALS);
  });
});
