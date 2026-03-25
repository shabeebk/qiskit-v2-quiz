import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress, DEFAULT_PROGRESS } from '../../src/hooks/useProgress';

const STORAGE_KEY = 'qiskit_progress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns default progress when localStorage is empty', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress).toEqual(DEFAULT_PROGRESS);
  });

  it('loads persisted progress from localStorage', () => {
    const saved = { correct: 5, total: 10, bySection: {} };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    const { result } = renderHook(() => useProgress());
    // useEffect runs asynchronously; wait for it
    act(() => {});
    expect(result.current.progress).toEqual(saved);
  });

  it('updateProgress persists to localStorage', () => {
    const { result } = renderHook(() => useProgress());
    const newP = { correct: 3, total: 4, bySection: {} };
    act(() => result.current.updateProgress(newP));
    expect(result.current.progress).toEqual(newP);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toEqual(newP);
  });

  it('resetProgress clears progress', () => {
    const { result } = renderHook(() => useProgress());
    const newP = { correct: 7, total: 10, bySection: {} };
    act(() => result.current.updateProgress(newP));
    act(() => result.current.resetProgress());
    expect(result.current.progress).toEqual(DEFAULT_PROGRESS);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toEqual(DEFAULT_PROGRESS);
  });

  it('gracefully handles corrupt localStorage data', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
    const { result } = renderHook(() => useProgress());
    act(() => {});
    expect(result.current.progress).toEqual(DEFAULT_PROGRESS);
  });
});
