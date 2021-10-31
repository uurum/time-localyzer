import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enter Time/i);
  expect(linkElement).toBeInTheDocument();
});

test('Time must be set before add action.', async () => {
  render(<App />);
  const errMessage = screen.getByText(/Enter valid time/i);
  expect(errMessage).not.toBeVisible();

  await userEvent.click(screen.getByText('Add'));
  expect(errMessage).toBeVisible();

  await fireEvent.change(screen.getByPlaceholderText('--:--'), {
    target: { value: '12:12' },
  });
  expect(errMessage).not.toBeVisible();
});

test('Add and delete function must be add and remove Berlin', async () => {

  render(<App />);
  await fireEvent.change(screen.getByPlaceholderText('--:--'), {
    target: { value: '08:15' },
  });
  await fireEvent.change(screen.getByPlaceholderText('Select City'), {
    target: { value: 'Berlin' },
  });
  await userEvent.click(screen.getByText('Add'));
  let items = await screen.findAllByText('Europe/Berlin');
  expect(items).toHaveLength(1);

  await userEvent.click(screen.queryByAltText('delete'));
  items = await screen.findAllByText('No city is selected');
  expect(items).toHaveLength(1);

});
