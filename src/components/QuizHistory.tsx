import React from "react";
import { QuizHistoryItem } from "../types";
import { History, Play, Eye, Trash2, Calendar, Trophy, BookOpen } from "lucide-react";

interface QuizHistoryProps {
  history: QuizHistoryItem[];
  onSelectQuizToReplay: (item: QuizHistoryItem) => void;
  onSelectQuizToReview: (item: QuizHistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearAllHistory: () => void;
}

export default function QuizHistory({
  history,
  onSelectQuizToReplay,
  onSelectQuizToReview,
  onDeleteHistoryItem,
  onClearAllHistory,
}: QuizHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center max-w-4xl mx-auto space-y-6 card-shadow relative overflow-hidden text-slate-800">
        <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
        <div className="p-4 bg-indigo-50 text-indigo-400 rounded-full inline-block border border-indigo-100">
          <History className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Your Study Vault is Empty</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto font-medium leading-relaxed">
            Once you configure and complete a smart quiz, your historical stats and educational briefs will populate here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn text-white" id="history-panel-container">
      {/* List Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-xl font-extrabold flex items-center gap-2 text-white">
            <History className="w-5 h-5 text-indigo-200" />
            <span>Personal Study Vault</span>
          </h3>
          <p className="text-xs text-indigo-200 mt-0.5 font-semibold">Your library of AI-generated educational challenges</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure you want to purge your entire saved quiz library? This cannot be undone.")) {
              onClearAllHistory();
            }
          }}
          className="text-xs text-white bg-white/10 hover:bg-white/20 font-bold border border-white/25 px-4 py-2 rounded-xl transition-all option-btn cursor-pointer uppercase tracking-wider"
        >
          Purge Library
        </button>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-800">
        {history.map((item) => {
          const scorePercent = Math.round((item.score / item.totalQuestions) * 100);

          let scoreBadgeColor = "bg-rose-50 text-rose-700 border-rose-100";
          if (scorePercent >= 80) scoreBadgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
          else if (scorePercent >= 50) scoreBadgeColor = "bg-amber-50 text-amber-700 border-amber-100";

          const formattedDate = new Date(item.playedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-xl card-shadow hover:shadow-2xl transition-all flex flex-col justify-between gap-5 group relative overflow-hidden"
            >
              {/* Vertical accent strip */}
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>

              {/* Header metadata */}
              <div className="space-y-3.5 pl-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                    {item.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-slate-850 leading-snug group-hover:text-indigo-600 transition-colors">
                    {item.quizTitle}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Topic: <strong className="text-slate-700">{item.topic}</strong></span>
                  </p>
                </div>
              </div>

              {/* Bottom stats and button tray */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5 pl-2">
                {/* Score badge */}
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${scoreBadgeColor}`}>
                  <Trophy className="w-3.5 h-3.5 fill-current" />
                  <span>{scorePercent}% Score</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectQuizToReview(item)}
                    title="Review educational briefs"
                    className="p-2.5 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 border border-indigo-50 hover:border-indigo-100 rounded-xl transition-all option-btn cursor-pointer"
                  >
                    <Eye className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectQuizToReplay(item)}
                    title="Retry playing this quiz"
                    className="p-2.5 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800 border border-emerald-50 hover:border-emerald-100 rounded-xl transition-all option-btn cursor-pointer"
                  >
                    <Play className="w-4.5 h-4.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteHistoryItem(item.id)}
                    title="Delete quiz from vault"
                    className="p-2.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 border border-transparent rounded-xl transition-all option-btn cursor-pointer"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
