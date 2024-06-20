import { render, screen } from '@testing-library/react';
import LineChart from '../Charts/LineChart';
import '@testing-library/jest-dom';

describe('PieChart', () => {
  it('renders the pie chart title', () => {
    render(<LineChart />);
    const titleElement = screen.getByText(/My Spline Chart/i);
    expect(titleElement).toBeInTheDocument();
  });
});

