import { describe, it, expect } from 'vitest';
import { shuffle } from '../../src/utils/shuffle';

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(arr.length);
  });

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).sort()).toEqual([...arr].sort());
  });

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  it('handles an empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles a single-element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('works with strings', () => {
    const arr = ['a', 'b', 'c'];
    expect(shuffle(arr).sort()).toEqual([...arr].sort());
  });

  it('produces different orderings across runs (probabilistic)', () => {
    const arr = Array.from({ length: 20 }, (_, i) => i);
    // Run several shuffles; it is astronomically unlikely all are identical
    const shuffles = Array.from({ length: 10 }, () => shuffle(arr).join(','));
    const unique = new Set(shuffles);
    expect(unique.size).toBeGreaterThan(1);
  });
});
