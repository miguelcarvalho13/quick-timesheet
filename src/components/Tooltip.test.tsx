import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';

const setup = () => {
  return render(
    <>
      <div data-testid="click-outside">Click outside</div>
      <Tooltip button={'my tooltip button'}>
        <span>My tooltip content</span>
      </Tooltip>
    </>,
  );
};

// TODO: find a way to test the outcome of tailwind classes in this tests instead of the presence of the class
test('renders the tooltip with a button', () => {
  setup();
  expect(screen.getByRole('button')).toHaveTextContent(/^my tooltip button$/);
});

test('renders the tooltip initially hidden', () => {
  setup();
  const tooltip = screen.getByRole('tooltip', { hidden: true });
  expect(tooltip).toHaveClass('invisible');
  expect(tooltip).toHaveTextContent(/^My tooltip content$/);
});

test('opens the tooltip when hovering on it and closes when unhovering', async () => {
  setup();
  const tooltip = screen.getByRole('tooltip', { hidden: true });
  await userEvent.hover(screen.getByRole('button'));
  expect(tooltip).not.toHaveClass('invisible');
  await userEvent.unhover(screen.getByRole('button'));
  expect(tooltip).toHaveClass('invisible');
});

test('opens the tooltip when clicking on it and closes clicking outside', async () => {
  setup();
  const tooltip = screen.getByRole('tooltip', { hidden: true });

  await userEvent.click(screen.getByRole('button'));
  expect(tooltip).not.toHaveClass('invisible');

  await userEvent.unhover(screen.getByRole('button'));
  // if it was open through a click it should remain open while unhovering it
  expect(tooltip).not.toHaveClass('invisible');

  await userEvent.click(screen.getByTestId('click-outside'));
  expect(tooltip).toHaveClass('invisible');
});

test('opens the tooltip through tab focus and closes it on the next tab', async () => {
  setup();
  const tooltip = screen.getByRole('tooltip', { hidden: true });
  await userEvent.keyboard('{Tab}');
  expect(tooltip).not.toHaveClass('invisible');
  await userEvent.keyboard('{Tab}');
  expect(tooltip).toHaveClass('invisible');
});
