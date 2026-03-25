import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timer } from '../../src/components/Timer';

describe('Timer', () => {
  it('displays the remaining seconds', () => {
    render(<Timer secs={30} total={45} />);
    expect(screen.getByText('30s')).toBeInTheDocument();
  });

  it('shows green when time is above 50%', () => {
    const { container } = render(<Timer secs={40} total={45} />);
    // structure: outer-flex > track-div > progress-bar (index 2)
    const bar = container.querySelectorAll('div')[2]!;
    expect(bar.style.background).toBe('rgb(34, 197, 94)');
  });

  it('shows orange when time is between 25% and 50%', () => {
    const { container } = render(<Timer secs={15} total={45} />);
    const bar = container.querySelectorAll('div')[2]!;
    expect(bar.style.background).toBe('rgb(245, 158, 11)');
  });

  it('shows red when time is below 25%', () => {
    const { container } = render(<Timer secs={5} total={45} />);
    const bar = container.querySelectorAll('div')[2]!;
    expect(bar.style.background).toBe('rgb(239, 68, 68)');
  });
});
