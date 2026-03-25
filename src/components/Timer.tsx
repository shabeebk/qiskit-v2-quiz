interface TimerProps {
  secs: number;
  total: number;
}

export function Timer({ secs, total }: TimerProps) {
  const pct = secs / total;
  const col = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div
        style={{
          width: 120,
          height: 6,
          borderRadius: 3,
          background: 'var(--color-border-tertiary)',
        }}
      >
        <div
          style={{
            width: `${pct * 100}%`,
            height: '100%',
            borderRadius: 3,
            background: col,
            transition: 'width 1s linear',
          }}
        />
      </div>
      <span style={{ fontSize: 13, color: col, fontWeight: 500, minWidth: 28 }}>{secs}s</span>
    </div>
  );
}
