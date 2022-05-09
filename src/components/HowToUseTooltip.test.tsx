import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HowToUseTooltip from './HowToUseTooltip';

const labelText = 'How to use tooltip';

test('renders the tooltip with the instructions on how to use', async () => {
  render(<HowToUseTooltip />);

  const tooltipButton = screen.getByLabelText(labelText);
  const tooltip = screen.getByRole('tooltip');
  const paragraphs = within(tooltip).getAllByRole('paragraph');

  await userEvent.click(tooltipButton);
  expect(tooltip).not.toHaveClass('invisible');
  expect(
    within(tooltip).getByRole('heading', { name: 'How to use' }),
  ).toBeInTheDocument();
  expect(paragraphs[0]).toHaveTextContent(
    'Pass dates (in the format DD/MM/YYYY) followed by line breaks with its range of intervals (in the format HH:mm-HH:mm). e.g:',
  );
  expect(paragraphs[1]).toHaveTextContent(
    '22/12/2022' +
      '07:15-12:15' +
      '13:15-17:00' +
      '23/12/2022' +
      '' +
      '06:20-09:15' +
      '10:50-12:30' +
      '13:40-17:10' +
      '...',
  );
});
