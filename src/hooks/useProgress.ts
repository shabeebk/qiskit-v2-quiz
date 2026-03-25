import { useState, useEffect } from 'react';
import type { Progress } from '../types';

const STORAGE_KEY = 'qiskit_progress';

export const DEFAULT_PROGRESS: Progress = { correct: 0, total: 0, bySection: {} };

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Progress) : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function save(p: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // storage unavailable (private browsing, quota exceeded)
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);

  useEffect(() => {
    setProgress(load());
  }, []);

  const updateProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    save(newProgress);
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    save(DEFAULT_PROGRESS);
  };

  return { progress, updateProgress, resetProgress };
}
