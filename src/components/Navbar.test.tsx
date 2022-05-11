import { render, screen, within } from '@testing-library/react';
import Navbar from './Navbar';

test('renders the navbar properly', () => {
  render(<Navbar />);
  const navbar = screen.getByRole('navigation');
  const mainLink = within(navbar).getByRole('link');
  expect(mainLink).toHaveTextContent('Quick Timesheet');
  expect(mainLink).toHaveAttribute('href', window.location.href);
  expect(
    within(navbar).getByLabelText('How to use tooltip'),
  ).toBeInTheDocument();
});
