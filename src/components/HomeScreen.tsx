import { useState } from 'react';
import { SECTIONS, QUESTION_BANK, DIFF_COLOR, DIFF_BG } from '../data/questions';
import { ProgressRing } from './ProgressRing';
import type { Difficulty, Progress, SectionId } from '../types';

interface HomeScreenProps {
  onStart: (sections: SectionId[], diffs: Difficulty[], count: number) => void;
  progress: Progress;
  onReset: () => void;
}

export function HomeScreen({ onStart, progress, onReset }: HomeScreenProps) {
  const [selSections, setSel] = useState<SectionId[]>([]);
  const [diffFilter, setDiff] = useState<Difficulty[]>(['easy', 'medium', 'hard']);
  const [qCount, setQCount] = useState(10);

  const toggle = (id: SectionId) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleDiff = (d: Difficulty) =>
    setDiff((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d]));

  const canStart = selSections.length > 0 && diffFilter.length > 0;
  const totalAvail = selSections.reduce(
    (a, sid) => (QUESTION_BANK[sid] ?? []).filter((q) => diffFilter.includes(q.difficulty)).length + a,
    0,
  );
  const pct = progress.total > 0 ? progress.correct / progress.total : 0;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Qiskit Quiz Portal
        </div>
        <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          IBM Certified Associate Developer – Qiskit v2.x
        </div>
      </div>

      {progress.total > 0 && (
        <div
          style={{
            background: 'var(--color-background-secondary)',
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <ProgressRing pct={pct} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
              All-time progress
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {progress.correct}/{progress.total} correct
            </div>
          </div>
          <button
            onClick={onReset}
            style={{
              marginLeft: 'auto',
              fontSize: 11,
              color: 'var(--color-text-tertiary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Reset
          </button>
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
        <div
          style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}
        >
          Select sections
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button
            onClick={() =>
              setSel(selSections.length === SECTIONS.length ? [] : SECTIONS.map((s) => s.id))
            }
            style={{
              fontSize: 12,
              padding: '5px 12px',
              borderRadius: 20,
              border: '1.5px solid',
              borderColor:
                selSections.length === SECTIONS.length ? '#6366f1' : 'var(--color-border-secondary)',
              background:
                selSections.length === SECTIONS.length
                  ? '#eef2ff'
                  : 'var(--color-background-secondary)',
              color:
                selSections.length === SECTIONS.length
                  ? '#4f46e5'
                  : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            All sections
          </button>
          {SECTIONS.map((s) => {
            const on = selSections.includes(s.id);
            const count = (QUESTION_BANK[s.id] ?? []).length;
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                style={{
                  fontSize: 12,
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: '1.5px solid',
                  borderColor: on ? '#6366f1' : 'var(--color-border-secondary)',
                  background: on ? '#eef2ff' : 'var(--color-background-secondary)',
                  color: on ? '#4f46e5' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: on ? 500 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {s.label}
                <span style={{ opacity: 0.6, fontSize: 10 }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div
          style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}
        >
          Difficulty
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
            const on = diffFilter.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDiff(d)}
                style={{
                  fontSize: 12,
                  padding: '5px 14px',
                  borderRadius: 20,
                  border: '1.5px solid',
                  borderColor: on ? DIFF_COLOR[d] : 'var(--color-border-secondary)',
                  background: on ? DIFF_BG[d] : 'var(--color-background-secondary)',
                  color: on ? DIFF_COLOR[d] : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: on ? 500 : 400,
                  textTransform: 'capitalize',
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}
        >
          Questions:{' '}
          <span style={{ color: 'var(--color-text-primary)' }}>
            {Math.min(qCount, totalAvail || qCount)}
          </span>
          {totalAvail > 0 && (
            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginLeft: 6 }}>
              of {totalAvail} available
            </span>
          )}
        </div>
        <input
          type="range"
          min={1}
          max={Math.max(totalAvail, 1)}
          value={Math.min(qCount, Math.max(totalAvail, 1))}
          onChange={(e) => setQCount(+e.target.value)}
          style={{ width: '100%' }}
          disabled={totalAvail === 0}
        />
      </div>

      <button
        disabled={!canStart}
        onClick={() => onStart(selSections, diffFilter, Math.min(qCount, totalAvail))}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: 10,
          background: canStart ? '#6366f1' : 'var(--color-border-secondary)',
          color: canStart ? '#fff' : 'var(--color-text-tertiary)',
          border: 'none',
          fontSize: 15,
          fontWeight: 500,
          cursor: canStart ? 'pointer' : 'not-allowed',
        }}
      >
        Start Quiz →
      </button>
    </div>
  );
}
