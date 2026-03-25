interface ProgressRingProps {
  pct: number;
  size?: number;
  stroke?: number;
}

export function ProgressRing({ pct, size = 48, stroke = 4 }: ProgressRingProps) {
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-border-tertiary)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#6366f1"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fill="var(--color-text-secondary)"
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}
