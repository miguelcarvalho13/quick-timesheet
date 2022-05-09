import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatValidation } from '../formatters/Validation';
import { ValidationTypes } from '../validators/TimesheetDayValidator';
import ValidationsTooltip from './ValidationsTooltip';

const labelText = 'Possible issues tooltip';

test('renders nothing if no validations are passed', () => {
  render(<ValidationsTooltip validations={undefined} />);
  expect(screen.queryByLabelText(labelText)).not.toBeInTheDocument();
});

test('renders the tooltip with all validations', async () => {
  render(
    <ValidationsTooltip
      validations={
        new Set([
          ValidationTypes.DUPLICATED_DATE,
          ValidationTypes.UNORDERED_TIME_INTERVALS,
        ])
      }
    />,
  );

  const tooltipButton = screen.getByLabelText(labelText);
  const tooltip = screen.getByRole('tooltip');
  const list = within(tooltip).getByRole('list', { name: 'Possible issues' });

  await userEvent.click(tooltipButton);
  expect(tooltip).not.toHaveClass('invisible');

  const listItems = within(list).getAllByRole('listitem');
  expect(listItems.length).toBe(2);
  expect(listItems[0]).toHaveTextContent(
    formatValidation(ValidationTypes.DUPLICATED_DATE),
  );
  expect(listItems[1]).toHaveTextContent(
    formatValidation(ValidationTypes.UNORDERED_TIME_INTERVALS),
  );
});

test('renders the tooltip with a single validation', () => {
  render(
    <ValidationsTooltip
      validations={new Set([ValidationTypes.UNORDERED_TIME_INTERVALS])}
    />,
  );

  const list = within(screen.getByRole('tooltip')).getByRole('list', {
    name: 'Possible issues',
  });
  const listItems = within(list).getAllByRole('listitem');

  expect(listItems.length).toBe(1);
  expect(listItems[0]).toHaveTextContent(
    formatValidation(ValidationTypes.UNORDERED_TIME_INTERVALS),
  );
});
