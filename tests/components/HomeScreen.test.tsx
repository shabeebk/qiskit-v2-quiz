import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeScreen } from '../../src/components/HomeScreen';
import type { Progress } from '../../src/types';

const emptyProgress: Progress = { correct: 0, total: 0, bySection: {} };

describe('HomeScreen', () => {
  it('renders the title', () => {
    render(<HomeScreen onStart={vi.fn()} progress={emptyProgress} onReset={vi.fn()} />);
    expect(screen.getByText('Qiskit Quiz Portal')).toBeInTheDocument();
  });

  it('Start Quiz button is disabled initially', () => {
    render(<HomeScreen onStart={vi.fn()} progress={emptyProgress} onReset={vi.fn()} />);
    expect(screen.getByText('Start Quiz →')).toBeDisabled();
  });

  it('Start Quiz button enables after selecting a section', () => {
    render(<HomeScreen onStart={vi.fn()} progress={emptyProgress} onReset={vi.fn()} />);
    fireEvent.click(screen.getByText('All sections'));
    expect(screen.getByText('Start Quiz →')).not.toBeDisabled();
  });

  it('shows progress ring when total > 0', () => {
    const progress: Progress = { correct: 7, total: 10, bySection: {} };
    render(<HomeScreen onStart={vi.fn()} progress={progress} onReset={vi.fn()} />);
    expect(screen.getByText(/All-time progress/)).toBeInTheDocument();
  });

  it('reset button calls onReset', () => {
    const onReset = vi.fn();
    const progress: Progress = { correct: 7, total: 10, bySection: {} };
    render(<HomeScreen onStart={vi.fn()} progress={progress} onReset={onReset} />);
    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it('calls onStart with correct args when form is submitted', () => {
    const onStart = vi.fn();
    render(<HomeScreen onStart={onStart} progress={emptyProgress} onReset={vi.fn()} />);
    fireEvent.click(screen.getByText('All sections'));
    fireEvent.click(screen.getByText('Start Quiz →'));
    expect(onStart).toHaveBeenCalledOnce();
    const [sections, diffs, count] = onStart.mock.calls[0];
    expect(sections).toHaveLength(8);
    expect(diffs).toEqual(['easy', 'medium', 'hard']);
    expect(count).toBeGreaterThan(0);
  });
});
