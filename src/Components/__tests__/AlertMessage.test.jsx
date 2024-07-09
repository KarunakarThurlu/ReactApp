import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertMessage from '../Utils/AlertMessage';
import userEvent from '@testing-library/user-event';

describe('AlertMessage Component', () => {
  test('renders AlertMessage component', () => {
    const { container } = render(<AlertMessage />);
    expect(container).toBeInTheDocument();
  });

  test('Snackbar is initially closed', () => {
    render(<AlertMessage />);
    expect(screen.queryByText('Note archived')).not.toBeInTheDocument();
  });

  test('Snackbar opens and closes correctly', () => {
    render(<AlertMessage />);

    // Initially, the Snackbar should not be open
    expect(screen.queryByText('Note archived')).not.toBeInTheDocument();

    // Find the Snackbar container (it exists but is not visible)
    const snackbarContainer = screen.getByRole('presentation').parentElement;

    // Open the Snackbar by setting state directly (this is for testing purposes)
    fireEvent.click(snackbarContainer);
    expect(screen.getByText('Note archived')).toBeInTheDocument();

    // Close the Snackbar by clicking the close button
    userEvent.click(snackbarContainer.querySelector('button'));
    expect(screen.queryByText('Note archived')).not.toBeInTheDocument();
  });
});
