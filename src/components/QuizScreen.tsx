import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTIONS, TIMER_SECS } from '../data/questions';
import { Badge } from './Badge';
import { Timer } from './Timer';
import type { QuestionWithSection, AnswerRecord } from '../types';

interface QuizScreenProps {
  questions: QuestionWithSection[];
  onFinish: (answers: AnswerRecord[]) => void;
}

export function QuizScreen({ questions, onFinish }: QuizScreenProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setReveal] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [secs, setSecs] = useState(TIMER_SECS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const q = questions[idx]!;

  const commit = useCallback(
    (ans: number) => {
      if (revealed) return;
      if (timerRef.current) clearInterval(timerRef.current);
      setSelected(ans);
      setReveal(true);
    },
    [revealed],
  );

  useEffect(() => {
    setSecs(TIMER_SECS);
    setSelected(null);
    setReveal(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          commit(-1);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [idx, commit]);

  const next = () => {
    const rec: AnswerRecord = {
      qid: q.id,
      section: q.section,
      correct: selected === q.answer,
      selected: selected ?? -1,
      timeTaken: TIMER_SECS - secs,
    };
    const newAns = [...answers, rec];
    if (idx + 1 < questions.length) {
      setAnswers(newAns);
      setIdx(idx + 1);
    } else {
      onFinish(newAns);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div
          style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--color-border-tertiary)' }}
        >
          <div
            style={{
              width: `${((idx + 1) / questions.length) * 100}%`,
              height: '100%',
              borderRadius: 3,
              background: '#6366f1',
              transition: 'width 0.3s',
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
          {idx + 1}/{questions.length}
        </span>
        <Timer secs={secs} total={TIMER_SECS} />
      </div>

      <div
        style={{
          background: 'var(--color-background-secondary)',
          borderRadius: 12,
          padding: '18px 20px',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Badge diff={q.difficulty} />
          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
            {SECTIONS.find((s) => s.id === q.section)?.label}
          </span>
        </div>
        <div style={{ fontSize: 15, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
          {q.q}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--color-background-secondary)';
          let bdr = 'var(--color-border-secondary)';
          let col = 'var(--color-text-primary)';
          if (revealed) {
            if (i === q.answer) {
              bg = '#dcfce7';
              bdr = '#22c55e';
              col = '#15803d';
            } else if (i === selected) {
              bg = '#fee2e2';
              bdr = '#ef4444';
              col = '#b91c1c';
            }
          } else if (selected === i) {
            bg = '#eef2ff';
            bdr = '#6366f1';
            col = '#4f46e5';
          }
          return (
            <button
              key={i}
              onClick={() => !revealed && commit(i)}
              style={{
                textAlign: 'left',
                padding: '11px 14px',
                borderRadius: 8,
                border: `1.5px solid ${bdr}`,
                background: bg,
                color: col,
                fontSize: 13.5,
                cursor: revealed ? 'default' : 'pointer',
                lineHeight: 1.5,
                fontFamily: 'var(--font-mono)',
                transition: 'background 0.2s,border-color 0.2s',
              }}
            >
              <span style={{ fontWeight: 500, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && selected === -1 && (
        <div
          style={{
            background: '#fff7ed',
            border: '1.5px solid #f59e0b',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 12,
            fontSize: 13,
            color: '#92400e',
          }}
        >
          ⏱ Time&apos;s up! Correct answer: <strong>{String.fromCharCode(65 + q.answer)}</strong>.
        </div>
      )}

      {revealed && (
        <div
          style={{
            background: 'var(--color-background-secondary)',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            borderLeft: '3px solid #6366f1',
          }}
        >
          <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Explanation: </span>
          {q.explanation}
        </div>
      )}

      {revealed && (
        <button
          onClick={next}
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
          {idx + 1 < questions.length ? 'Next question →' : 'See results →'}
        </button>
      )}
    </div>
  );
}
