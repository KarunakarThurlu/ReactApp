import { render, screen } from '@testing-library/react';
import ColumnChart from '../Charts/ColumnChart';
import '@testing-library/jest-dom';

describe('ColumnChart', () => {
  it('renders the spline chart title', () => {
    render(<ColumnChart />);
    const titleElement = screen.getByText(/My chart/i);
    expect(titleElement).toBeInTheDocument();
  });
});

