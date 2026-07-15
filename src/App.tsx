import React, { useState, useEffect } from "react";
import { Quiz, QuizHistoryItem, LeaderboardEntry } from "./types";
import QuizSetup from "./components/QuizSetup";
import QuizPlayer from "./components/QuizPlayer";
import QuizReview from "./components/QuizReview";
import QuizHistory from "./components/QuizHistory";
import Leaderboard from "./components/Leaderboard";
import { PRESET_QUIZZES } from "./presets";
import { Brain, History, Sparkles, BookOpen, ChevronRight, AlertCircle, RefreshCw, Trophy } from "lucide-react";

const LOADING_SLOGANS = [
  "Consulting authoritative educational databases...",
  "Calibrating question difficulty & cognitive levels...",
  "Formulating plausible, highly-rigorous distractors...",
  "Writing comprehensive pedagogical answer explanations...",
  "Assembling final quiz structure & verifying fact accuracy...",
  "Tailoring vocabulary to your specified target audience...",
];

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"setup" | "history" | "leaderboard">("setup");
  const [gameState, setGameState] = useState<"setup" | "playing" | "reviewing">("setup");
  
  // Data States
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeAnswers, setActiveAnswers] = useState<{ [key: number]: string }>({});
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Active quiz session score points states
  const [activeBasePoints, setActiveBasePoints] = useState(0);
  const [activeBonusPoints, setActiveBonusPoints] = useState(0);
  const [activeTotalPoints, setActiveTotalPoints] = useState(0);
  
  // Async Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_SLOGANS[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load history and leaderboard from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quiz_vault_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
      const savedLeaderboard = localStorage.getItem("quiz_leaderboard");
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard));
      }
    } catch (err) {
      console.error("Error reading startup data from localStorage:", err);
    }
  }, []);

  // Save history to localStorage on changes
  const saveHistory = (newHistory: QuizHistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("quiz_vault_history", JSON.stringify(newHistory));
    } catch (err) {
      console.error("Error writing quiz history to localStorage:", err);
    }
  };

  // Save leaderboard to localStorage on changes
  const saveLeaderboard = (newLeaderboard: LeaderboardEntry[]) => {
    setLeaderboard(newLeaderboard);
    try {
      localStorage.setItem("quiz_leaderboard", JSON.stringify(newLeaderboard));
    } catch (err) {
      console.error("Error writing leaderboard to localStorage:", err);
    }
  };

  const handleClearLeaderboard = () => {
    saveLeaderboard([]);
  };

  const handleRegisterLeaderboardEntry = (userName: string, base: number, bonus: number, total: number) => {
    if (!activeQuiz) return;
    
    // Calculate final score
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (activeAnswers[q.questionNumber] === q.correctAnswer) {
        correctCount++;
      }
    });

    const entry: LeaderboardEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
      userName,
      quizTitle: activeQuiz.quizTitle,
      topic: activeQuiz.topic,
      difficulty: activeQuiz.difficulty,
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      basePoints: base,
      bonusPoints: bonus,
      totalPoints: total,
      playedAt: new Date().toISOString()
    };

    const updatedLeaderboard = [...leaderboard, entry];
    saveLeaderboard(updatedLeaderboard);
  };

  // Rotating loading messages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let sloganIdx = 0;
      interval = setInterval(() => {
        sloganIdx = (sloganIdx + 1) % LOADING_SLOGANS.length;
        setLoadingMessage(LOADING_SLOGANS[sloganIdx]);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // Handle Quiz Generation
  const handleGenerateQuiz = async (config: {
    topic: string;
    targetAudience: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    questionCount: number;
    includeTrueFalse: boolean;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingMessage(LOADING_SLOGANS[0]);

    // Check if there is an instant preset quiz that matches the selected topic
    const presetKey = Object.keys(PRESET_QUIZZES).find(
      (key) => key.toLowerCase() === config.topic.trim().toLowerCase()
    );

    if (presetKey) {
      // Simulate a very short, satisfying speed-run compilation effect (200ms) to make it feel polished
      await new Promise((resolve) => setTimeout(resolve, 200));
      const presetData = PRESET_QUIZZES[presetKey];
      setActiveQuiz(presetData);
      setActiveAnswers({});
      setGameState("playing");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }

      const data: Quiz = await response.json();
      
      // Basic sanity checks on received structure
      if (!data || !data.quizTitle || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("Received malformed quiz payload from AI service. Please try again.");
      }

      setActiveQuiz(data);
      setActiveAnswers({});
      setGameState("playing");
    } catch (err: any) {
      console.error("Quiz generation error:", err);
      setErrorMessage(err.message || "An unexpected network or server error occurred. Please verify your internet connection and API configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Quiz Submission / Completion
  const handleQuizSubmit = (
    answers: { [questionNumber: number]: string },
    timeRemaining: { [questionNumber: number]: number }
  ) => {
    if (!activeQuiz) return;
    
    setActiveAnswers(answers);
    
    // Calculate Score & Points
    let correctCount = 0;
    let basePoints = 0;
    let bonusPoints = 0;

    activeQuiz.questions.forEach((q) => {
      const isCorrect = answers[q.questionNumber] === q.correctAnswer;
      if (isCorrect) {
        correctCount++;
        basePoints += 100;
        const remSecs = timeRemaining[q.questionNumber] || 0;
        bonusPoints += remSecs * 5;
      }
    });

    const totalPoints = basePoints + bonusPoints;
    setActiveBasePoints(basePoints);
    setActiveBonusPoints(bonusPoints);
    setActiveTotalPoints(totalPoints);

    // Save to history list
    const historyItem: QuizHistoryItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
      quizTitle: activeQuiz.quizTitle,
      topic: activeQuiz.topic,
      difficulty: activeQuiz.difficulty,
      questionCount: activeQuiz.questions.length,
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      playedAt: new Date().toISOString(),
      answers,
      quiz: activeQuiz,
      basePoints,
      bonusPoints,
      totalPoints,
      questionTimeRemaining: timeRemaining
    };

    const updatedHistory = [historyItem, ...history];
    saveHistory(updatedHistory);
    setGameState("reviewing");
  };

  // Action methods from results
  const handleRetakeQuiz = () => {
    setActiveAnswers({});
    setActiveBasePoints(0);
    setActiveBonusPoints(0);
    setActiveTotalPoints(0);
    setGameState("playing");
  };

  const handleNewQuizSetup = () => {
    setActiveQuiz(null);
    setActiveAnswers({});
    setActiveBasePoints(0);
    setActiveBonusPoints(0);
    setActiveTotalPoints(0);
    setGameState("setup");
    setActiveTab("setup");
  };

  // Study Vault interactions
  const handleReplayQuizFromHistory = (item: QuizHistoryItem) => {
    setActiveQuiz(item.quiz);
    setActiveAnswers({});
    setGameState("playing");
  };

  const handleReviewQuizFromHistory = (item: QuizHistoryItem) => {
    setActiveQuiz(item.quiz);
    setActiveAnswers(item.answers);

    // Load points details if they exist in history, otherwise default to recalculation
    let correctCount = 0;
    item.quiz.questions.forEach((q) => {
      if (item.answers[q.questionNumber] === q.correctAnswer) {
        correctCount++;
      }
    });
    setActiveBasePoints(item.basePoints !== undefined ? item.basePoints : correctCount * 100);
    setActiveBonusPoints(item.bonusPoints || 0);
    setActiveTotalPoints(item.totalPoints !== undefined ? item.totalPoints : correctCount * 100);

    setGameState("reviewing");
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  const handleClearAllHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="min-h-screen vibrant-bg text-slate-800 flex flex-col font-sans selection:bg-indigo-200 selection:text-indigo-900" id="app-root">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/10 border-b border-white/10 backdrop-blur-md text-white shadow-sm">
        <div className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleNewQuizSetup}>
            <div className="p-2 bg-white/25 text-white rounded-xl border border-white/20 shadow-xs">
              <Brain className="w-5 h-5 fill-white/10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base sm:text-lg">Quiz Generator</span>
                <span className="text-[10px] font-semibold text-white bg-indigo-500/30 border border-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  Gemini AI
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-white/75 font-medium">Educational Synthesis Engine</p>
            </div>
          </div>

          {/* Navigation Controls */}
          {gameState === "setup" && (
            <nav className="flex items-center gap-1.5 bg-white/10 border border-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("setup")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "setup"
                    ? "bg-white text-indigo-900 shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 relative ${
                  activeTab === "history"
                    ? "bg-white text-indigo-900 shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Vault</span>
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white border border-white">
                    {history.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("leaderboard")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "leaderboard"
                    ? "bg-white text-indigo-900 shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Arcade</span>
              </button>
            </nav>
          )}

          {/* Active Session Status indicator */}
          {gameState !== "setup" && (
            <button
              type="button"
              onClick={handleNewQuizSetup}
              className="text-xs font-semibold text-white hover:text-white/95 bg-white/15 hover:bg-white/25 px-3.5 py-2 rounded-xl border border-white/15 transition-all flex items-center gap-1.5"
            >
              <span>Setup Menu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content View Frame */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
        {/* Error Notification Toast/Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-900 text-sm max-w-4xl mx-auto shadow-xs" id="app-error-banner">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-2 flex-grow">
              <strong className="font-semibold block">Syllabus Synthesis Failure</strong>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline flex items-center gap-1.5 mt-1"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse" />
                <span>Dismiss & Setup Again</span>
              </button>
            </div>
          </div>
        )}

        {/* State Machine Router */}
        {gameState === "setup" ? (
          activeTab === "setup" ? (
            <QuizSetup
              onGenerate={handleGenerateQuiz}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
            />
          ) : activeTab === "history" ? (
            <QuizHistory
              history={history}
              onSelectQuizToReplay={handleReplayQuizFromHistory}
              onSelectQuizToReview={handleReviewQuizFromHistory}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onClearAllHistory={handleClearAllHistory}
            />
          ) : (
            <Leaderboard
              entries={leaderboard}
              onClearLeaderboard={handleClearLeaderboard}
            />
          )
        ) : gameState === "playing" && activeQuiz ? (
          <QuizPlayer
            quiz={activeQuiz}
            onSubmit={handleQuizSubmit}
            onCancel={handleNewQuizSetup}
          />
        ) : gameState === "reviewing" && activeQuiz ? (
          <QuizReview
            quiz={activeQuiz}
            answers={activeAnswers}
            onRestart={handleRetakeQuiz}
            onNewQuiz={handleNewQuizSetup}
            basePoints={activeBasePoints}
            bonusPoints={activeBonusPoints}
            totalPoints={activeTotalPoints}
            onSubmitLeaderboard={handleRegisterLeaderboardEntry}
            onViewLeaderboard={() => {
              setGameState("setup");
              setActiveTab("leaderboard");
            }}
          />
        ) : (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
            <p className="mt-2 text-sm text-white/80">Recalibrating layout states...</p>
          </div>
        )}
      </main>

      {/* Aesthetic Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-6 text-center text-xs text-white/60 font-medium">
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AI-Powered Quiz Generation Engine • Verifiable Factuality</span>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold text-white">Gemini 3.5</span>
            <span className="text-white/40 mx-1">|</span>
            <span>Google AI Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
