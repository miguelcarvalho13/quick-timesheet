import { cleanup, render, screen, within } from '@testing-library/react';
import TimesheetDay from '../models/TimesheetDay';
import { ValidationTypes } from '../validators/TimesheetDayValidator';
import { build } from './TimesheetTableData';

describe('build', () => {
  test('given an empty list returns empty columns and rows', () => {
    expect(build([], new Map())).toEqual({ columns: [], rows: [] });
  });

  test('returns the correct set of columns and rows', () => {
    const timesheetDays = TimesheetDay.parse(`
      20/12/2022
      07:15-18:00

      21/12/2022
      07:10-15:45
    `);

    const { columns, rows } = build(
      timesheetDays,
      new Map([
        [timesheetDays[1], new Set([ValidationTypes.UNORDERED_TIME_INTERVALS])],
      ]),
    );

    expect(columns.length).toBe(4);
    expect(columns[0].name).toBe('Day');
    expect(columns[1].name).toBe('Entry 1');
    expect(columns[2].name).toBe('Entry 2');
    expect(columns[3].name).toBe('Total');

    expect(rows.length).toBe(2);
    expect(rows[0]).toEqual({
      original: timesheetDays[0],
      date: '20/12/2022',
      entries: ['07:15', '18:00'],
      totalDuration: '10h 45m',
      validations: undefined,
    });
    expect(rows[1]).toEqual({
      original: timesheetDays[1],
      date: '21/12/2022',
      entries: ['07:10', '15:45'],
      totalDuration: '8h 35m',
      validations: new Set([ValidationTypes.UNORDERED_TIME_INTERVALS]),
    });
  });

  test('returns the correct cells for the columns', () => {
    const timesheetDays = TimesheetDay.parse(`
      20/12/2022
      07:15-18:00

      20/12/2022
      07:15-18:00
    `);
    const { columns, rows } = build(
      timesheetDays,
      new Map([[timesheetDays[0], new Set([ValidationTypes.DUPLICATED_DATE])]]),
    );
    const getElement = () => screen.getByRole('cell');

    render(<td>{columns[0].cell.render(rows[0])}</td>);
    expect(getElement()).toHaveTextContent(/20\/12\/2022/);
    expect(within(getElement()).getByRole('tooltip')).toBeInTheDocument();
    cleanup();

    render(<td>{columns[1].cell.render(rows[0])}</td>);
    expect(getElement()).toHaveTextContent(/^07:15$/);
    cleanup();

    render(<td>{columns[2].cell.render(rows[0])}</td>);
    expect(getElement()).toHaveTextContent(/^18:00$/);
    cleanup();

    render(<td>{columns[3].cell.render(rows[0])}</td>);
    expect(getElement()).toHaveTextContent(/^10h 45m$/);
    cleanup();
  });

  test('correctly deals with days with less entries than the maximum entries', () => {
    const timesheetDays = TimesheetDay.parse(`
      20/12/2022
      07:15-12:00
      13:00-18:00

      21/12/2022
      07:15-18:00
    `);
    const { columns, rows } = build(timesheetDays, new Map());
    const getElement = () => screen.getByRole('cell');

    render(<td>{columns[0].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/21\/12\/2022/);
    expect(within(getElement()).queryByRole('tooltip')).not.toBeInTheDocument();
    cleanup();

    render(<td>{columns[1].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/^07:15$/);
    cleanup();

    render(<td>{columns[2].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/^18:00$/);
    cleanup();

    render(<td>{columns[3].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/^-$/);
    cleanup();

    render(<td>{columns[4].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/^-$/);
    cleanup();

    render(<td>{columns[5].cell.render(rows[1])}</td>);
    expect(getElement()).toHaveTextContent(/^10h 45m$/);
    cleanup();
  });
});
