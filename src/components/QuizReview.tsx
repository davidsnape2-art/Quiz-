import React, { useState } from "react";
import { Quiz, QuizHistoryItem } from "../types";
import { Trophy, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Sparkles, AlertCircle, Medal, Send, Sparkle } from "lucide-react";

interface QuizReviewProps {
  quiz: Quiz;
  answers: { [questionNumber: number]: string };
  onRestart: () => void;
  onNewQuiz: () => void;
  basePoints?: number;
  bonusPoints?: number;
  totalPoints?: number;
  onSubmitLeaderboard?: (userName: string, base: number, bonus: number, total: number) => void;
  onViewLeaderboard?: () => void;
}

export default function QuizReview({
  quiz,
  answers,
  onRestart,
  onNewQuiz,
  basePoints = 0,
  bonusPoints = 0,
  totalPoints = 0,
  onSubmitLeaderboard,
  onViewLeaderboard,
}: QuizReviewProps) {
  const [userName, setUserName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Calculate final score details
  let correctCount = 0;
  quiz.questions.forEach((q) => {
    if (answers[q.questionNumber] === q.correctAnswer) {
      correctCount++;
    }
  });

  const totalQuestions = quiz.questions.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // If points are 0 but correctCount is greater than 0, let's auto-calculate default base points (fallback)
  const finalBasePoints = basePoints || correctCount * 100;
  const finalBonusPoints = bonusPoints;
  const finalTotalPoints = totalPoints || finalBasePoints;

  // Determine scoring evaluation
  let feedbackTitle = "Review Complete";
  let feedbackMessage = "";
  let feedbackBg = "from-indigo-500 to-indigo-600";

  if (scorePercent === 100) {
    feedbackTitle = "Impeccable Synthesis!";
    feedbackMessage = "You demonstrated perfect masterclass recall and structural understanding of this material.";
    feedbackBg = "from-emerald-600 to-teal-700";
  } else if (scorePercent >= 80) {
    feedbackTitle = "Distinguished Performance!";
    feedbackMessage = "Excellent comprehension. You have securely consolidated a high percentage of these details.";
    feedbackBg = "from-indigo-600 to-indigo-700";
  } else if (scorePercent >= 50) {
    feedbackTitle = "Developing Comprehension";
    feedbackMessage = "A solid baseline. Reviewing the curated micro-explanations below will help secure these core relationships.";
    feedbackBg = "from-amber-600 to-orange-700";
  } else {
    feedbackTitle = "Foundation Layering";
    feedbackMessage = "A perfect opportunity for learning. Read the detailed guides below to build up your core facts.";
    feedbackBg = "from-rose-600 to-rose-700";
  }

  const handleRegisterScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setSubmitError("Please provide a valid moniker/name.");
      return;
    }
    if (userName.length > 20) {
      setSubmitError("Moniker must be 20 characters or fewer.");
      return;
    }

    if (onSubmitLeaderboard) {
      onSubmitLeaderboard(userName.trim(), finalBasePoints, finalBonusPoints, finalTotalPoints);
      setIsSubmitted(true);
      setSubmitError("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn text-white" id="quiz-review-container">
      {/* Score Summary Banner */}
      <div className={`bg-gradient-to-r ${feedbackBg} rounded-3xl p-6 md:p-8 shadow-xl card-shadow mb-6 flex flex-col md:flex-row items-center gap-6 text-white`}>
        <div className="relative flex items-center justify-center shrink-0">
          {/* Animated score circle */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xs">
            <span className="text-2xl sm:text-4xl font-extrabold">{scorePercent}%</span>
            <span className="text-[10px] sm:text-xs font-bold text-white/80 mt-0.5">{correctCount}/{totalQuestions} Correct</span>
          </div>
          <div className="absolute -top-1 -right-1 p-2 bg-amber-400 text-slate-900 rounded-full shadow-md">
            <Trophy className="w-4 h-4 fill-current text-amber-800" />
          </div>
        </div>

        <div className="text-center md:text-left space-y-2 flex-grow">
          <h2 className="text-xl sm:text-2xl font-black flex items-center justify-center md:justify-start gap-2">
            <span>{feedbackTitle}</span>
            <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          </h2>
          <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-xl">
            {feedbackMessage}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-1.5">
            <span className="text-xs bg-white/20 px-3.5 py-1 rounded-lg font-bold">Topic: {quiz.topic}</span>
            <span className="text-xs bg-white/20 px-3.5 py-1 rounded-lg font-bold">Level: {quiz.difficulty}</span>
          </div>
        </div>

        {/* Dynamic Points Display Grid inside Banner */}
        <div className="w-full md:w-auto bg-black/20 rounded-2xl p-4 flex flex-row md:flex-col justify-around gap-4 md:gap-2 shrink-0 border border-white/10 min-w-[160px]">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-bold text-white/60 block leading-none">Accuracy Base</span>
            <span className="text-base font-extrabold leading-tight mt-1 inline-block">{finalBasePoints} pts</span>
          </div>
          <div className="h-8 w-[1px] md:h-[1px] md:w-full bg-white/10"></div>
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-bold text-amber-300 block leading-none">Speed Bonus</span>
            <span className="text-base font-extrabold text-amber-300 leading-tight mt-1 inline-block">+{finalBonusPoints} pts</span>
          </div>
          <div className="h-8 w-[1px] md:h-[1px] md:w-full bg-white/10"></div>
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-bold text-indigo-200 block leading-none">Total Points</span>
            <span className="text-xl font-black text-white leading-tight mt-0.5 inline-block">{finalTotalPoints} pts</span>
          </div>
        </div>
      </div>

      {/* Arcade Leaderboard Entry Module */}
      {onSubmitLeaderboard && (
        <div className="bg-white rounded-3xl p-6 shadow-xl card-shadow mb-6 text-slate-800 relative overflow-hidden border-2 border-amber-300">
          <div className="absolute top-0 right-0 p-8 text-amber-300/10 pointer-events-none">
            <Trophy className="w-24 h-24" />
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleRegisterScore} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-slate-850 flex items-center gap-1.5">
                    <Medal className="w-5 h-5 text-amber-400 fill-amber-400/10" />
                    <span>Claim Your Spot on the Leaderboard!</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    You earned a high score of <strong>{finalTotalPoints} points</strong>. Enter your name to register.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (submitError) setSubmitError("");
                    }}
                    placeholder="Enter your heroic name (e.g. Einstein)"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-850 font-bold focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 transition-all text-sm outline-none"
                    maxLength={20}
                  />
                  {submitError && (
                    <p className="text-rose-500 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{submitError}</span>
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Submit Score</span>
                  <Send className="w-4 h-4 fill-current" />
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-extrabold text-slate-850 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  <span>Score Successfully Registered!</span>
                </h4>
                <p className="text-xs text-slate-500 font-semibold">
                  Congratulations <strong>{userName}</strong>! Your score is now secured on the global top 5 list.
                </p>
              </div>
              {onViewLeaderboard && (
                <button
                  type="button"
                  onClick={onViewLeaderboard}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                >
                  View Leaderboard 🏆
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Review Section Title */}
      <div className="flex items-center justify-between mb-4 px-1 text-white">
        <h3 className="text-lg font-extrabold uppercase tracking-wider text-indigo-100">Pedagogical Review Briefs</h3>
        <p className="text-xs text-indigo-200/80 font-medium">Read explanation card to master target details</p>
      </div>

      {/* Questions Review list */}
      <div className="space-y-6 mb-8 text-slate-800" id="questions-review-list">
        {quiz.questions.map((q) => {
          const userAnswer = answers[q.questionNumber];
          const isUserCorrect = userAnswer === q.correctAnswer;

          return (
            <div key={q.questionNumber} className="bg-white rounded-3xl p-6 md:p-8 shadow-xl card-shadow space-y-4 relative overflow-hidden">
              {/* Dynamic Left accent bar for review status */}
              <div className={`absolute top-0 left-0 w-2.5 h-full ${
                isUserCorrect ? "bg-emerald-500" : "bg-rose-500"
              }`}></div>

              {/* Card top bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 pl-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">QUESTION {q.questionNumber}</span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  isUserCorrect 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50" 
                    : "bg-rose-50 text-rose-700 border border-rose-100/50"
                }`}>
                  {isUserCorrect ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{userAnswer === "" ? "Time Out" : "Incorrect Choice"}</span>
                    </>
                  )}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-base md:text-lg font-semibold text-slate-950 leading-relaxed pl-2">
                {q.questionText}
              </p>

              {/* Options list static render */}
              <div className="grid grid-cols-1 gap-2.5 pl-2">
                {q.options.map((option, oIdx) => {
                  const isCorrectOpt = option === q.correctAnswer;
                  const isUserSelectedOpt = option === userAnswer;

                  let optStyle = "border-slate-100 bg-slate-50 text-slate-600";
                  let badge = null;

                  if (isCorrectOpt) {
                    optStyle = "border-emerald-200 bg-emerald-50 text-emerald-900 font-bold";
                    badge = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
                  } else if (isUserSelectedOpt) {
                    optStyle = "border-rose-200 bg-rose-50 text-rose-900 font-bold";
                    badge = <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
                  }

                  return (
                    <div
                      key={oIdx}
                      className={`px-4 py-3 rounded-2xl border text-sm md:text-base flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold ${
                          isCorrectOpt 
                            ? "bg-emerald-600 text-white" 
                            : isUserSelectedOpt 
                              ? "bg-rose-600 text-white" 
                              : "bg-slate-200 text-slate-500"
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Explanation section */}
              <div className="p-5 bg-indigo-50/45 border border-indigo-100/50 rounded-2xl space-y-2 pl-5">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-indigo-600" />
                  <span>Pedagogical Guidance</span>
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                  {q.detailedExplanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md option-btn cursor-pointer uppercase tracking-wider text-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retake This Quiz</span>
        </button>

        <button
          type="button"
          onClick={onNewQuiz}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/15 option-btn cursor-pointer uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Configure New Quiz</span>
        </button>
      </div>
    </div>
  );
}

