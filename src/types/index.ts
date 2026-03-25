export type Difficulty = 'easy' | 'medium' | 'hard';
export type SectionId = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8';

export interface Question {
  id: string;
  difficulty: Difficulty;
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuestionWithSection extends Question {
  section: SectionId;
}

export interface AnswerRecord {
  qid: string;
  section: SectionId;
  correct: boolean;
  selected: number;
  timeTaken: number;
}

export interface SectionProgress {
  correct: number;
  total: number;
}

export interface Progress {
  correct: number;
  total: number;
  bySection: Partial<Record<SectionId, SectionProgress>>;
}

export interface Section {
  id: SectionId;
  label: string;
}
