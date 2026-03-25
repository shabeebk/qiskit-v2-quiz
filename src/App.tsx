import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { useProgress } from './hooks/useProgress';
import { shuffle } from './utils/shuffle';
import { QUESTION_BANK } from './data/questions';
import type { AnswerRecord, Difficulty, QuestionWithSection, SectionId } from './types';

type Screen = 'home' | 'quiz' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [questions, setQuestions] = useState<QuestionWithSection[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const { progress, updateProgress, resetProgress } = useProgress();

  const startQuiz = (secs: SectionId[], diffs: Difficulty[], count: number) => {
    const pool: QuestionWithSection[] = [];
    secs.forEach((sid) =>
      (QUESTION_BANK[sid] ?? [])
        .filter((q) => diffs.includes(q.difficulty))
        .forEach((q) => pool.push({ ...q, section: sid })),
    );
    setQuestions(shuffle(pool).slice(0, count));
    setScreen('quiz');
  };

  const finishQuiz = (ans: AnswerRecord[]) => {
    setAnswers(ans);
    const newP = {
      ...progress,
      total: progress.total + ans.length,
      correct: progress.correct + ans.filter((a) => a.correct).length,
    };
    ans.forEach((a) => {
      if (!newP.bySection[a.section]) newP.bySection[a.section] = { correct: 0, total: 0 };
      newP.bySection[a.section]!.total++;
      if (a.correct) newP.bySection[a.section]!.correct++;
    });
    updateProgress(newP);
    setScreen('results');
  };

  if (screen === 'quiz') return <QuizScreen questions={questions} onFinish={finishQuiz} />;
  if (screen === 'results')
    return (
      <ResultsScreen
        answers={answers}
        questions={questions}
        onHome={() => setScreen('home')}
        progress={progress}
      />
    );
  return <HomeScreen onStart={startQuiz} progress={progress} onReset={resetProgress} />;
}
