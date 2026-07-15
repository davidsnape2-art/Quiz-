import React from "react";
import { LeaderboardEntry } from "../types";
import { Trophy, Calendar, Sparkles, Medal, Trash2, BookOpen, Clock, Award } from "lucide-react";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClearLeaderboard: () => void;
}

export default function Leaderboard({ entries, onClearLeaderboard }: LeaderboardProps) {
  const sortedEntries = [...entries]
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime();
    })
    .slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn text-white" id="leaderboard-panel-container">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-xl font-extrabold flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-amber-300 fill-amber-300/20" />
            <span>Top 5 Arcade Leaderboard</span>
          </h3>
          <p className="text-xs text-indigo-200 mt-0.5 font-semibold">Honoring the fastest and most knowledgeable minds</p>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to reset the leaderboard? This action cannot be undone.")) {
                onClearLeaderboard();
              }
            }}
            className="text-xs text-white bg-white/10 hover:bg-white/20 font-bold border border-white/25 px-4 py-2 rounded-xl transition-all option-btn cursor-pointer uppercase tracking-wider"
          >
            Reset Board
          </button>
        )}
      </div>

      {/* Main Leaderboard Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl card-shadow relative overflow-hidden text-slate-800">
        <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-amber-400 to-indigo-600"></div>

        {sortedEntries.length === 0 ? (
          <div className="text-center py-10 space-y-4">
            <div className="p-4 bg-amber-50 text-amber-500 rounded-full inline-block border border-amber-100">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-slate-800">Leaderboard is Unclaimed</h4>
              <p className="text-sm text-slate-500 max-w-md mx-auto font-medium">
                Submit your score after completing any smart quiz in either mode to claim your spot on the high score list!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map((entry, index) => {
              const formattedDate = new Date(entry.playedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              // Medal or rank style
              let rankBadge = (
                <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-slate-500 text-lg shrink-0">
                  {index + 1}
                </div>
              );

              if (index === 0) {
                rankBadge = (
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border-2 border-amber-400 flex items-center justify-center text-amber-500 shrink-0 shadow-md shadow-amber-500/10 animate-pulse">
                    <Medal className="w-6 h-6 fill-amber-300 text-amber-600" />
                  </div>
                );
              } else if (index === 1) {
                rankBadge = (
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-slate-350 flex items-center justify-center text-slate-500 shrink-0 shadow-md">
                    <Medal className="w-6 h-6 fill-slate-200 text-slate-500" />
                  </div>
                );
              } else if (index === 2) {
                rankBadge = (
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border-2 border-orange-300 flex items-center justify-center text-orange-600 shrink-0 shadow-md">
                    <Medal className="w-6 h-6 fill-orange-200 text-orange-600" />
                  </div>
                );
              }

              return (
                <div
                  key={entry.id}
                  className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100/50 transition-all card-shadow pl-6"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {rankBadge}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 text-base md:text-lg">{entry.userName}</span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {entry.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-xs font-semibold">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-slate-650 max-w-[150px] sm:max-w-xs truncate" title={entry.quizTitle}>{entry.quizTitle}</span>
                        </span>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Points display */}
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-200/60">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-slate-400 font-bold">Accuracy</p>
                        <p className="text-slate-700 font-bold">{entry.score}/{entry.totalQuestions}</p>
                      </div>
                      <div className="h-6 w-[1px] bg-slate-200"></div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-slate-400 font-bold">Base</p>
                        <p className="text-slate-700 font-bold">{entry.basePoints}</p>
                      </div>
                      <div className="h-6 w-[1px] bg-slate-200"></div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-slate-400 font-bold">Bonus</p>
                        <p className="text-indigo-600 font-bold">+{entry.bonusPoints}</p>
                      </div>
                    </div>

                    <div className="bg-indigo-600 text-white rounded-2xl px-5 py-2.5 text-center shadow-md shadow-indigo-600/10 flex flex-col justify-center min-w-[100px]">
                      <span className="text-[10px] uppercase font-bold text-indigo-200 leading-none">Total</span>
                      <span className="text-xl font-extrabold tracking-tight leading-none mt-1">{entry.totalPoints}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fun motivational tip */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center text-xs text-white/80 font-medium">
        <Sparkles className="w-4 h-4 inline-block mr-1.5 text-amber-300 fill-amber-300/20" />
        <span>Tip: Answer correctly within <strong>10 seconds</strong> to secure maximum Speed-Multiplier bonus points!</span>
      </div>
    </div>
  );
}
