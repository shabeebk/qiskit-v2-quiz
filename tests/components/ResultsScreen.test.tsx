import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultsScreen } from '../../src/components/ResultsScreen';
import type { AnswerRecord, Progress, QuestionWithSection } from '../../src/types';

const mockQuestions: QuestionWithSection[] = [
  {
    id: 's1q1',
    section: 's1',
    difficulty: 'easy',
    q: 'Which gate is the NOT gate?',
    options: ['Pauli-X', 'Pauli-Z', 'Hadamard', 'S'],
    answer: 0,
    explanation: 'Pauli-X is the NOT gate.',
  },
  {
    id: 's1q2',
    section: 's1',
    difficulty: 'medium',
    q: 'What does Hadamard do?',
    options: ['Creates superposition', 'Flips', 'Rotates Z', 'Swaps'],
    answer: 0,
    explanation: 'Hadamard creates superposition.',
  },
];

const allCorrect: AnswerRecord[] = [
  { qid: 's1q1', section: 's1', correct: true, selected: 0, timeTaken: 5 },
  { qid: 's1q2', section: 's1', correct: true, selected: 0, timeTaken: 10 },
];

const oneWrong: AnswerRecord[] = [
  { qid: 's1q1', section: 's1', correct: true, selected: 0, timeTaken: 5 },
  { qid: 's1q2', section: 's1', correct: false, selected: 1, timeTaken: 10 },
];

const emptyProgress: Progress = { correct: 0, total: 0, bySection: {} };

describe('ResultsScreen', () => {
  it('shows percentage score', () => {
    render(
      <ResultsScreen
        answers={allCorrect}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={emptyProgress}
      />,
    );
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('shows Pass grade for 100%', () => {
    render(
      <ResultsScreen
        answers={allCorrect}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={emptyProgress}
      />,
    );
    expect(screen.getByText(/Pass/)).toBeInTheDocument();
  });

  it('shows "Needs work" for 50%', () => {
    render(
      <ResultsScreen
        answers={oneWrong}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={emptyProgress}
      />,
    );
    expect(screen.getByText('Needs work')).toBeInTheDocument();
  });

  it('shows perfect score message when all correct', () => {
    render(
      <ResultsScreen
        answers={allCorrect}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={emptyProgress}
      />,
    );
    expect(screen.getByText(/Perfect score/)).toBeInTheDocument();
  });

  it('shows incorrect question in review section', () => {
    render(
      <ResultsScreen
        answers={oneWrong}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={emptyProgress}
      />,
    );
    expect(screen.getByText('What does Hadamard do?')).toBeInTheDocument();
  });

  it('calls onHome when back button clicked', () => {
    const onHome = vi.fn();
    render(
      <ResultsScreen
        answers={allCorrect}
        questions={mockQuestions}
        onHome={onHome}
        progress={emptyProgress}
      />,
    );
    fireEvent.click(screen.getByText(/Back to home/));
    expect(onHome).toHaveBeenCalledOnce();
  });

  it('shows all-time progress when total > 0', () => {
    const progress: Progress = { correct: 8, total: 10, bySection: {} };
    render(
      <ResultsScreen
        answers={allCorrect}
        questions={mockQuestions}
        onHome={vi.fn()}
        progress={progress}
      />,
    );
    expect(screen.getByText(/All-time/)).toBeInTheDocument();
  });
});
