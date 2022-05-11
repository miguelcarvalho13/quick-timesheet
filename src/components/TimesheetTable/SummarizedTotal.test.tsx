import { render, screen } from '@testing-library/react';
import TimesheetDay from '../../models/TimesheetDay';
import SummarizedTotal from './SummarizedTotal';

test('renders a total with positive extra hours', () => {
  const timesheetDays = TimesheetDay.parse(`
    25/12/2022
    07:10-17:10
  `);
  render(<SummarizedTotal timesheetDays={timesheetDays} />);
  expect(screen.getByRole('paragraph')).toHaveTextContent(
    /^Total hours: 10h 0m \| Extra hours \(8h\/day\): \+2h 0m$/,
  );
});

test('renders a total with negative extra hours', () => {
  const timesheetDays = TimesheetDay.parse(`
    25/12/2022
    07:10-14:10
  `);
  render(<SummarizedTotal timesheetDays={timesheetDays} />);
  expect(screen.getByRole('paragraph')).toHaveTextContent(
    /^Total hours: 7h 0m \| Extra hours \(8h\/day\): -1h 0m$/,
  );
});
