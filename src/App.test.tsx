import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('converts text to timesheet table', async () => {
  const expectedText = `
    29/04/2022
    07:15-16:45
  `;
  const user = userEvent.setup();
  render(<App />);

  expect(screen.queryByRole('table')).not.toBeInTheDocument();

  await user.click(screen.getByRole('textbox'));
  await user.keyboard(expectedText);
  expect(screen.getByRole('textbox')).toHaveValue(expectedText);

  await user.click(screen.getByRole('button', { name: /^Convert$/ }));
  expect(screen.getByRole('table')).toBeInTheDocument();

  const columns = screen.getAllByRole('columnheader');
  expect(columns.length).toBe(4);
  expect(columns[0]).toHaveTextContent(/^Day$/);
  expect(columns[1]).toHaveTextContent(/^Entry 1$/);
  expect(columns[2]).toHaveTextContent(/^Entry 2$/);
  expect(columns[3]).toHaveTextContent(/^Total$/);

  const [, tableBody, tableFooter] = screen.getAllByRole('rowgroup');

  const bodyCells = within(tableBody).getAllByRole('cell');
  expect(bodyCells[0]).toHaveTextContent(/^29\/04\/2022$/);
  expect(bodyCells[1]).toHaveTextContent(/^07:15$/);
  expect(bodyCells[2]).toHaveTextContent(/^16:45$/);
  expect(bodyCells[3]).toHaveTextContent(/^9h 30m$/);

  const footerCell = within(tableFooter).getByRole('cell');
  expect(footerCell).toHaveTextContent(
    /^Total hours: 9h 30m \| Extra hours \(8h\/day\): \+1h 30m$/
  );
});

test('does not renders the table if no text is provided', async () => {
  const expectedText = ' ';
  const user = userEvent.setup();
  render(<App />);

  expect(screen.queryByRole('table')).not.toBeInTheDocument();

  await user.click(screen.getByRole('textbox'));
  await user.keyboard(expectedText);
  expect(screen.getByRole('textbox')).toHaveValue(expectedText);

  await user.click(screen.getByRole('button', { name: /^Convert$/ }));
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
});
