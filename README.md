# Qiskit Quiz Portal

Interactive quiz app to prepare for the **IBM Certified Associate Developer – Qiskit v2.x** exam.
200 multiple-choice questions across 8 sections with timer, explanations, and progress tracking.

## Features

- 200 questions in 8 sections (25 each), three difficulty tiers
- 45-second per-question countdown timer
- Section and difficulty filtering
- Answer explanations after each question
- All-time progress persisted in `localStorage`
- Results screen with per-section breakdown and incorrect answer review

## Development

```bash
npm install
npm run dev          # start dev server at http://localhost:5173/quiz/
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript compiler (no emit) |
| `npm run lint` | ESLint (zero warnings) |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (used in CI) |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with V8 coverage |

## Tech stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 6** for bundling
- **Vitest** + **@testing-library/react** for tests
- **ESLint 9** (typescript-eslint, react-hooks, react-refresh)
- **Prettier** for formatting
- **GitHub Actions** for CI + GitHub Pages deployment

## CI/CD

Two workflows live in `.github/workflows/`:

- **`ci.yml`** — runs on every push/PR to `main`: typecheck → lint/format → test (Node 18 & 20) → build
- **`deploy.yml`** — deploys to GitHub Pages on every push to `main`

## Project structure

```
src/
├── components/
│   ├── Badge.tsx          # Difficulty pill
│   ├── ErrorBoundary.tsx  # React error boundary
│   ├── HomeScreen.tsx     # Quiz configuration screen
│   ├── ProgressRing.tsx   # SVG progress ring
│   ├── QuizScreen.tsx     # Active quiz screen
│   ├── ResultsScreen.tsx  # Post-quiz results
│   └── Timer.tsx          # Countdown bar
├── data/
│   └── questions.ts       # 200 questions + section metadata
├── hooks/
│   └── useProgress.ts     # localStorage progress hook
├── types/
│   └── index.ts           # Shared TypeScript types
├── utils/
│   └── shuffle.ts         # Fisher-Yates shuffle
├── App.tsx
├── main.tsx
└── test-setup.ts
tests/
├── components/            # Component tests
├── hooks/                 # Hook tests
└── utils/                 # Utility tests
```
