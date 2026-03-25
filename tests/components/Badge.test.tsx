import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../src/components/Badge';

describe('Badge', () => {
  it('renders the difficulty label', () => {
    render(<Badge diff="easy" />);
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('applies green color for easy', () => {
    const { container } = render(<Badge diff="easy" />);
    const span = container.querySelector('span')!;
    expect(span.style.color).toBe('rgb(34, 197, 94)');
  });

  it('applies orange color for medium', () => {
    const { container } = render(<Badge diff="medium" />);
    const span = container.querySelector('span')!;
    expect(span.style.color).toBe('rgb(245, 158, 11)');
  });

  it('applies red color for hard', () => {
    const { container } = render(<Badge diff="hard" />);
    const span = container.querySelector('span')!;
    expect(span.style.color).toBe('rgb(239, 68, 68)');
  });
});
