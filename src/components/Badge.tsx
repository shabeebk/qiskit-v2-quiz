import { DIFF_BG, DIFF_COLOR } from '../data/questions';
import type { Difficulty } from '../types';

interface BadgeProps {
  diff: Difficulty;
}

export function Badge({ diff }: BadgeProps) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 99,
        background: DIFF_BG[diff],
        color: DIFF_COLOR[diff],
      }}
    >
      {diff}
    </span>
  );
}
