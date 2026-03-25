import { SECTIONS } from '../data/questions';
import type { AnswerRecord, Progress, QuestionWithSection, SectionId } from '../types';

interface ResultsScreenProps {
  answers: AnswerRecord[];
  questions: QuestionWithSection[];
  onHome: () => void;
  progress: Progress;
}

export function ResultsScreen({ answers, questions, onHome, progress }: ResultsScreenProps) {
  const correct = answers.filter((a) => a.correct).length;
  const pct = correct / answers.length;
  const grade = pct >= 0.8 ? 'Pass 🎉' : pct >= 0.6 ? 'Almost there' : 'Needs work';
  const gradeCol = pct >= 0.8 ? '#15803d' : pct >= 0.6 ? '#b45309' : '#b91c1c';

  const bySection: Partial<Record<SectionId, { c: number; t: number }>> = {};
  answers.forEach((a) => {
    if (!bySection[a.section]) bySection[a.section] = { c: 0, t: 0 };
    bySection[a.section]!.t++;
    if (a.correct) bySection[a.section]!.c++;
  });

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 42, fontWeight: 500, color: gradeCol }}>{Math.round(pct * 100)}%</div>
        <div style={{ fontSize: 18, color: 'var(--color-text-primary)', fontWeight: 500, marginTop: 4 }}>
          {grade}
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
          {correct}/{answers.length} correct
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            marginBottom: 10,
          }}
        >
          By section
        </div>
        {(Object.entries(bySection) as [SectionId, { c: number; t: number }][]).map(
          ([sid, { c, t }]) => (
            <div
              key={sid}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--color-text-secondary)',
                  minWidth: 170,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {SECTIONS.find((s) => s.id === sid)?.label}
              </div>
              <div
                style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--color-border-tertiary)' }}
              >
                <div
                  style={{
                    width: `${(c / t) * 100}%`,
                    height: '100%',
                    borderRadius: 3,
                    background: c / t >= 0.7 ? '#22c55e' : '#f59e0b',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  minWidth: 36,
                  textAlign: 'right',
                }}
              >
                {c}/{t}
              </span>
            </div>
          ),
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            marginBottom: 10,
          }}
        >
          Review incorrect answers
        </div>
        {answers
          .filter((a) => !a.correct)
          .map((a) => {
            const q = questions.find((x) => x.id === a.qid);
            return q ? (
              <div
                key={a.qid}
                style={{
                  background: 'var(--color-background-secondary)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  marginBottom: 8,
                  borderLeft: '3px solid #ef4444',
                }}
              >
                <div
                  style={{
                    fontSize: 12.5,
                    color: 'var(--color-text-primary)',
                    marginBottom: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {q.q}
                </div>
                <div style={{ fontSize: 12, color: '#15803d', marginBottom: 2 }}>
                  ✓ {q.options[q.answer]}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                  {q.explanation}
                </div>
              </div>
            ) : null;
          })}
        {answers.every((a) => a.correct) && (
          <div style={{ fontSize: 13, color: '#15803d', textAlign: 'center', padding: '12px' }}>
            Perfect score — no mistakes! 🏆
          </div>
        )}
      </div>

      {progress.total > 0 && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          All-time: {progress.correct}/{progress.total} (
          {Math.round((progress.correct / progress.total) * 100)}%)
        </div>
      )}

      <button
        onClick={onHome}
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: 8,
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        ← Back to home
      </button>
    </div>
  );
}
