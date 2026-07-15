export interface Question {
  questionNumber: number;
  questionText: string;
  questionType: 'MultipleChoice' | 'TrueFalse';
  options: string[];
  correctAnswer: string;
  difficultyRating: number;
  hint: string;
  detailedExplanation: string;
}

export interface Quiz {
  quizTitle: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  questions: Question[];
}

export interface QuizHistoryItem {
  id: string;
  quizTitle: string;
  topic: string;
  difficulty: string;
  questionCount: number;
  score: number;
  totalQuestions: number;
  playedAt: string;
  answers: { [questionNumber: number]: string };
  quiz: Quiz;
  // New scoring fields
  basePoints?: number;
  bonusPoints?: number;
  totalPoints?: number;
  questionTimeRemaining?: { [questionNumber: number]: number }; // remaining seconds for each question
}

export interface LeaderboardEntry {
  id: string;
  userName: string;
  quizTitle: string;
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  playedAt: string;
}
