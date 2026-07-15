import React, { useState, useEffect } from "react";
import { Question, Quiz } from "../types";
import { Lightbulb, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Send, EyeOff, Sparkles, Clock } from "lucide-react";

interface QuizPlayerProps {
  quiz: Quiz;
  onSubmit: (answers: { [questionNumber: number]: string }, questionTimeRemaining: { [questionNumber: number]: number }) => void;
  onCancel: () => void;
}

export default function QuizPlayer({ quiz, onSubmit, onCancel }: QuizPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [instantFeedbackAnswers, setInstantFeedbackAnswers] = useState<{ [key: number]: boolean }>({}); // tracks if user locked in answer for that question in instant mode
  const [showHint, setShowHint] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState<'instant' | 'exam'>("instant");

  // Timer states
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionTimeouts, setQuestionTimeouts] = useState<{ [key: number]: boolean }>({});
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState<{ [key: number]: number }>({});

  const question: Question = quiz.questions[currentIdx];
  const isLastQuestion = currentIdx === quiz.questions.length - 1;
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  // Set up timer for the current question
  useEffect(() => {
    const qNum = question.questionNumber;
    const isAnswered = selectedAnswers[qNum] !== undefined;
    const isTimedOut = questionTimeouts[qNum] === true;

    if (isAnswered || isTimedOut) {
      setTimeLeft(questionTimeRemaining[qNum] || 0);
      return;
    }

    setTimeLeft(60);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [currentIdx]);

  const handleTimeout = () => {
    const qNum = question.questionNumber;
    setQuestionTimeouts((prev) => ({
      ...prev,
      [qNum]: true,
    }));
    setQuestionTimeRemaining((prev) => ({
      ...prev,
      [qNum]: 0,
    }));
    setSelectedAnswers((prev) => ({
      ...prev,
      [qNum]: "", // empty means timed out
    }));

    if (feedbackMode === "instant") {
      setInstantFeedbackAnswers((prev) => ({
        ...prev,
        [qNum]: true,
      }));
    }
  };

  // Handles clicking an option
  const handleOptionClick = (option: string) => {
    const qNum = question.questionNumber;

    if (feedbackMode === "instant" && instantFeedbackAnswers[qNum]) {
      return; // already locked in in Study Mode
    }
    if (selectedAnswers[qNum] !== undefined || questionTimeouts[qNum]) {
      return; // already answered or timed out
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [qNum]: option,
    }));

    setQuestionTimeRemaining((prev) => ({
      ...prev,
      [qNum]: timeLeft,
    }));

    if (feedbackMode === "instant") {
      setInstantFeedbackAnswers((prev) => ({
        ...prev,
        [qNum]: true,
      }));
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setShowHint(false);
    }
  };

  const handleFinish = () => {
    // Fill in any unanswered questions as incorrect (0s left)
    const finalAnswers = { ...selectedAnswers };
    const finalTimeRemaining = { ...questionTimeRemaining };

    quiz.questions.forEach((q) => {
      if (finalAnswers[q.questionNumber] === undefined) {
        finalAnswers[q.questionNumber] = "";
        finalTimeRemaining[q.questionNumber] = 0;
      }
    });

    onSubmit(finalAnswers, finalTimeRemaining);
  };

  const isQuestionAnsweredInstant = feedbackMode === "instant" && instantFeedbackAnswers[question.questionNumber];
  const selectedOptionForCurrent = selectedAnswers[question.questionNumber];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn" id="quiz-player-view">
      
      {/* 1. Transparent Header Block from Vibrant Palette */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-white pb-2 border-b border-white/10">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
            Current Topic: {quiz.topic}
          </span>
          <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight leading-tight">
            {quiz.quizTitle}
          </h1>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Level: {quiz.difficulty}</span>
            </div>
            {/* Study Mode Selector */}
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10 flex">
              <button
                type="button"
                onClick={() => {
                  if (Object.keys(selectedAnswers).length === 0 || confirm("Switching modes will reset current progress. Continue?")) {
                    setFeedbackMode("instant");
                    setSelectedAnswers({});
                    setInstantFeedbackAnswers({});
                    setQuestionTimeouts({});
                    setQuestionTimeRemaining({});
                    setCurrentIdx(0);
                  }
                }}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg tracking-wider transition-all ${
                  feedbackMode === "instant" ? "bg-white text-indigo-950 font-extrabold shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                Study
              </button>
              <button
                type="button"
                onClick={() => {
                  if (Object.keys(selectedAnswers).length === 0 || confirm("Switching modes will reset current progress. Continue?")) {
                    setFeedbackMode("exam");
                    setSelectedAnswers({});
                    setInstantFeedbackAnswers({});
                    setQuestionTimeouts({});
                    setQuestionTimeRemaining({});
                    setCurrentIdx(0);
                  }
                }}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg tracking-wider transition-all ${
                  feedbackMode === "exam" ? "bg-white text-indigo-950 font-extrabold shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                Exam
              </button>
            </div>
          </div>
          <div className="text-[10px] font-extrabold text-indigo-200 uppercase tracking-widest">
            Question {String(currentIdx + 1).padStart(2, '0')} of {String(totalQuestions).padStart(2, '0')}
          </div>
        </div>
      </header>

      {/* 2. Grid Columns layout matching Vibrant theme */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Core Question & Answers area (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* A. Timer Countdown Bar */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4 card-shadow text-white">
            <div className="flex items-center gap-2 shrink-0">
              <Clock className={`w-5 h-5 ${timeLeft < 15 ? "text-rose-400 animate-pulse" : "text-emerald-400"}`} />
              <span className="text-xs font-bold uppercase tracking-wider min-w-[120px]">
                {questionTimeouts[question.questionNumber] ? (
                  <span className="text-rose-400 font-extrabold animate-pulse">TIME'S UP!</span>
                ) : selectedOptionForCurrent !== undefined ? (
                  <span className="text-emerald-400">Answer Locked</span>
                ) : (
                  <span>Timer: <strong className={timeLeft < 15 ? "text-rose-400 text-sm" : "text-indigo-200 text-sm"}>{timeLeft}s</strong></span>
                )}
              </span>
            </div>
            {/* Visual Bar */}
            <div className="flex-grow h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft < 15 ? "bg-rose-500 animate-pulse" : timeLeft < 30 ? "bg-amber-400" : "bg-emerald-400"
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* B. The Rounded Question Card */}
          <div className="bg-white rounded-3xl p-6 md:p-10 flex flex-col justify-center min-h-[220px] shadow-xl card-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-indigo-500"></div>
            <span className="text-indigo-500 font-extrabold mb-3.5 block uppercase tracking-wider text-xs md:text-sm">
              Question {String(question.questionNumber).padStart(2, '0')}
            </span>
            <h2 className="text-xl md:text-2.5xl font-semibold text-slate-800 leading-snug" id="player-question-text">
              {question.questionText}
            </h2>
          </div>

          {/* C. The Custom Option Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="options-container">
            {question.options.map((option, idx) => {
              const isSelected = selectedOptionForCurrent === option;
              const isCorrect = option === question.correctAnswer;
              const isAnswered = selectedOptionForCurrent !== undefined;
              const isTimedOut = questionTimeouts[question.questionNumber] === true;

              let btnStyle = "bg-white border-2 border-transparent text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/20";
              let badgeStyle = "bg-indigo-100 text-indigo-600";
              let iconElement = null;

              if (feedbackMode === "instant") {
                if (isQuestionAnsweredInstant) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold";
                    badgeStyle = "bg-emerald-600 text-white";
                    iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold";
                    badgeStyle = "bg-rose-600 text-white";
                    iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
                  } else {
                    btnStyle = "bg-slate-50/50 border-2 border-transparent text-slate-400 opacity-60";
                    badgeStyle = "bg-slate-100 text-slate-400";
                  }
                }
              } else {
                // Classic Exam Mode selection style
                if (isSelected) {
                  btnStyle = "bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500/15";
                  badgeStyle = "bg-indigo-600 text-white";
                } else if (isAnswered || isTimedOut) {
                  btnStyle = "bg-slate-50/50 border-2 border-transparent text-slate-400 opacity-60";
                  badgeStyle = "bg-slate-100 text-slate-400";
                }
              }

              return (
                <button
                  key={`${currentIdx}-${idx}`}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered || isTimedOut}
                  className={`option-btn rounded-2xl p-5 text-left flex items-center justify-between gap-4 card-shadow group cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold tracking-wider transition-all group-hover:bg-indigo-600 group-hover:text-white shrink-0 ${badgeStyle}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-base font-medium transition-colors">{option}</span>
                  </div>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Micro Learning Pedagogical Breakdown */}
          {isQuestionAnsweredInstant && (
            <div className="p-6 bg-white/95 rounded-2xl border-l-4 border-indigo-600 shadow-lg card-shadow space-y-3 animate-fadeIn" id="explanation-box-instant">
              <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Pedagogical Analysis</span>
                <span className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-md ${
                  selectedOptionForCurrent === question.correctAnswer ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}>
                  {selectedOptionForCurrent === question.correctAnswer ? "Answer Verified" : questionTimeouts[question.questionNumber] ? "Time Expired" : "Incorrect Assumption"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {question.detailedExplanation}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Info/Hint/Progress blocks (4 Columns) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Quick Hint Card from Vibrant Palette */}
          <div className="bg-amber-400 rounded-3xl p-6 card-shadow flex flex-col justify-between gap-4 min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 text-amber-900 mb-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                  <line x1="9" y1="18" x2="15" y2="18"></line>
                  <line x1="10" y1="22" x2="14" y2="22"></line>
                </svg>
                <span className="font-extrabold uppercase text-xs tracking-widest">Quick Hint</span>
              </div>
              
              <p className="text-amber-950 font-bold leading-relaxed text-sm">
                {showHint ? question.hint : "Use the toggle button below if you need a conceptual key clue to evaluate this question."}
              </p>
            </div>

            <div className="space-y-3.5 mt-auto">
              {/* Trigger for Hint */}
              {selectedOptionForCurrent === undefined && !questionTimeouts[question.questionNumber] && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Lightbulb className="w-3.5 h-3.5" />}
                  <span>{showHint ? "Conceal Hint" : "Expose Hint"}</span>
                </button>
              )}
              <div className="p-3 bg-amber-500/25 rounded-xl border border-amber-900/10 text-[10px] font-extrabold uppercase text-amber-950 tracking-wider text-center">
                Cognitive Complexity: {question.difficultyRating} / 10
              </div>
            </div>
          </div>

          {/* Progress Trace panel */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col gap-4 text-white card-shadow">
            <span className="text-white text-[10px] font-extrabold uppercase tracking-widest opacity-80">Progress Trace</span>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2">
              {quiz.questions.map((q, idx) => {
                let dotStyle = "bg-white/20";
                if (idx === currentIdx) {
                  dotStyle = "bg-white/55 ring-2 ring-white";
                } else {
                  const savedAnswer = selectedAnswers[q.questionNumber];
                  if (savedAnswer !== undefined) {
                    if (feedbackMode === "instant") {
                      const wasCorrect = savedAnswer === q.correctAnswer;
                      dotStyle = wasCorrect ? "bg-emerald-400 animate-pulse" : "bg-rose-400 animate-pulse";
                    } else {
                      dotStyle = "bg-indigo-300";
                    }
                  } else if (questionTimeouts[q.questionNumber]) {
                    dotStyle = "bg-rose-400";
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (feedbackMode === "exam" || selectedAnswers[quiz.questions[idx].questionNumber] !== undefined || questionTimeouts[quiz.questions[idx].questionNumber] || idx < currentIdx) {
                        setCurrentIdx(idx);
                        setShowHint(false);
                      }
                    }}
                    title={`Go to Question ${idx + 1}`}
                    className={`h-3 rounded-full cursor-pointer transition-all duration-250 ${dotStyle}`}
                  ></button>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-white/70 uppercase tracking-tight pt-1">
              <span>{progressPercent}% Journey Complete</span>
              <span>Mode: {feedbackMode === "instant" ? "Study Mode" : "Exam Mode"}</span>
            </div>
          </div>

        </aside>
      </main>

      {/* 3. Action Tray Footer matching Design */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="px-8 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all option-btn"
        >
          Previous Question
        </button>

        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to abandon? Session status will be lost.")) {
                onCancel();
              }
            }}
            className="flex-1 sm:flex-initial px-8 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white/20 transition-all option-btn text-center"
          >
            Quit Setup
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleFinish}
              disabled={selectedOptionForCurrent === undefined && !questionTimeouts[question.questionNumber]}
              className="flex-1 sm:flex-initial px-10 py-3 rounded-2xl bg-indigo-400 hover:bg-indigo-300 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-950/20 transition-all option-btn flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span>Submit Exam</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedOptionForCurrent === undefined && !questionTimeouts[question.questionNumber]}
              className="flex-1 sm:flex-initial px-10 py-3 rounded-2xl bg-indigo-400 hover:bg-indigo-300 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-950/20 transition-all option-btn flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

