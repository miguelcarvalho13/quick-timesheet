import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimesheetTable from './TimesheetTable';
import TimesheetDay from '../models/TimesheetDay';
import { formatValidation } from '../formatters/Validator';
import { ValidationTypes } from '../validators/TimesheetDayValidator';

const timesheetDays = TimesheetDay.parse(`
  12/12/2022
  09:50-10:45
  13:50-16:15
  16:45-19:37

  13/12/2022
  07:30-12:24
  13:22-16:44

  13/12/2022
  07:30-13:30
  13:15-18:50
`);

test('renders an empty table given an empty list of timesheet days', () => {
  render(<TimesheetTable daysList={[]} />);
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
});

describe('columns', () => {
  test('renders the table with the correct set of columns', () => {
    render(<TimesheetTable daysList={timesheetDays} />);
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders.length).toBe(8);
    expect(columnHeaders[0]).toHaveTextContent(/^Day$/);
    expect(columnHeaders[1]).toHaveTextContent(/^Entry 1$/);
    expect(columnHeaders[2]).toHaveTextContent(/^Entry 2$/);
    expect(columnHeaders[3]).toHaveTextContent(/^Entry 3$/);
    expect(columnHeaders[4]).toHaveTextContent(/^Entry 4$/);
    expect(columnHeaders[5]).toHaveTextContent(/^Entry 5$/);
    expect(columnHeaders[6]).toHaveTextContent(/^Entry 6$/);
    expect(columnHeaders[7]).toHaveTextContent(/^Total$/);
  });
});

describe('rows', () => {
  const setup = () => render(<TimesheetTable daysList={timesheetDays} />);

  test('renders the expected amount of rows in the table body', () => {
    setup();
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const rows = within(tableBody).getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  test("renders the table's first row with the correct set of cells", () => {
    setup();
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const firstRow = within(tableBody).getAllByRole('row')[0];
    const firstRowCells = within(firstRow).getAllByRole('cell');

    expect(firstRowCells.length).toBe(8);
    expect(firstRowCells[0]).toHaveTextContent(/12\/12\/2022/);
    expect(firstRowCells[1]).toHaveTextContent(/^09:50$/);
    expect(firstRowCells[2]).toHaveTextContent(/^10:45$/);
    expect(firstRowCells[3]).toHaveTextContent(/^13:50$/);
    expect(firstRowCells[4]).toHaveTextContent(/^16:15$/);
    expect(firstRowCells[5]).toHaveTextContent(/^16:45$/);
    expect(firstRowCells[6]).toHaveTextContent(/^19:37$/);
    expect(firstRowCells[7]).toHaveTextContent(/^6h 12m$/);
  });

  test("renders the table's second row with the correct set of cells", () => {
    setup();
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const secondRow = within(tableBody).getAllByRole('row')[1];
    const secondRowCells = within(secondRow).getAllByRole('cell');

    expect(secondRowCells.length).toBe(8);
    expect(secondRowCells[0]).toHaveTextContent(/13\/12\/2022/);
    expect(secondRowCells[1]).toHaveTextContent(/^07:30$/);
    expect(secondRowCells[2]).toHaveTextContent(/^12:24$/);
    expect(secondRowCells[3]).toHaveTextContent(/^13:22$/);
    expect(secondRowCells[4]).toHaveTextContent(/^16:44$/);
    expect(secondRowCells[5]).toHaveTextContent(/^-$/);
    expect(secondRowCells[6]).toHaveTextContent(/^-$/);
    expect(secondRowCells[7]).toHaveTextContent(/^8h 16m$/);
  });

  test("renders the table's third row with the correct set of cells", () => {
    setup();
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const thirdRow = within(tableBody).getAllByRole('row')[2];
    const thirdRowCells = within(thirdRow).getAllByRole('cell');

    expect(thirdRowCells.length).toBe(8);
    expect(thirdRowCells[0]).toHaveTextContent(/13\/12\/2022/);
    expect(thirdRowCells[1]).toHaveTextContent(/^07:30$/);
    expect(thirdRowCells[2]).toHaveTextContent(/^13:30$/);
    expect(thirdRowCells[3]).toHaveTextContent(/^13:15$/);
    expect(thirdRowCells[4]).toHaveTextContent(/^18:50$/);
    expect(thirdRowCells[5]).toHaveTextContent(/^-$/);
    expect(thirdRowCells[6]).toHaveTextContent(/^-$/);
    expect(thirdRowCells[7]).toHaveTextContent(/^11h 35m$/);
  });

  test('renders the table with the issues tooltip', async () => {
    setup();
    const tableBody = screen.getAllByRole('rowgroup')[1];
    const thirdRow = within(tableBody).getAllByRole('row')[2];
    const thirdRowCells = within(thirdRow).getAllByRole('cell');

    const tooltipButton = within(thirdRowCells[0]).getByLabelText(
      'Possible issues tooltip',
    );
    const tooltip = within(thirdRowCells[0]).getByRole('tooltip');
    expect(tooltipButton).toBeInTheDocument();
    await userEvent.click(tooltipButton);
    expect(tooltip).not.toHaveClass('invisible');
    expect(tooltip).toHaveTextContent(
      formatValidation(ValidationTypes.DUPLICATED_DATE),
    );
    expect(tooltip).toHaveTextContent(
      formatValidation(ValidationTypes.UNORDERED_TIME_INTERVALS),
    );
  });
});

describe('footer', () => {
  test("renders the table's first row with the correct set of cells", () => {
    render(<TimesheetTable daysList={timesheetDays} />);
    const tableFooter = screen.getAllByRole('rowgroup')[2];
    const footerCell = within(tableFooter).getByRole('cell');

    expect(footerCell).toHaveTextContent(
      /^Total hours: 26h 3m \| Extra hours \(8h\/day\): \+2h 3m$/,
    );
  });
});
