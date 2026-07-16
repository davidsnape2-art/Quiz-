import React, { useState, useRef } from "react";
import { Brain, Sparkles, BookOpen, Users, Sliders, HelpCircle, ArrowRight, Play, Zap, FileCode, Upload, AlertCircle, CheckCircle2, Clipboard, Trash2 } from "lucide-react";
import { PRESET_QUIZZES } from "../presets";
import { convertCustomQuizToStandard } from "../utils";
import { Quiz } from "../types";

interface QuizSetupProps {
  onGenerate: (config: {
    topic: string;
    targetAudience: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    questionCount: number;
    includeTrueFalse: boolean;
  }) => void;
  onImportQuiz?: (quiz: Quiz) => void;
  isLoading: boolean;
  loadingMessage: string;
}

const TOPIC_SUGGESTIONS = [
  { topic: "Quantum Physics", category: "Science", icon: "⚛️" },
  { topic: "Renaissance Art & History", category: "Humanities", icon: "🎨" },
  { topic: "JavaScript Closures & Async", category: "Tech", icon: "💻" },
  { topic: "Cellular Biology & Genetics", category: "Science", icon: "🧬" },
  { topic: "Ancient Roman Architecture", category: "History", icon: "🏛️" },
  { topic: "World War II Cryptography", category: "History", icon: "🔐" },
  { topic: "Cognitive Psychology", category: "Social Sci", icon: "🧠" },
  { topic: "Astrophysics & Black Holes", category: "Science", icon: "🌌" },
];

export default function QuizSetup({ onGenerate, onImportQuiz, isLoading, loadingMessage }: QuizSetupProps) {
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("General Trivia Enthusiasts");
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>("Intermediate");
  const [questionCount, setQuestionCount] = useState<number>(8);
  const [includeTrueFalse, setIncludeTrueFalse] = useState(true);

  // New states for custom JSON upload & paste
  const [setupMode, setSetupMode] = useState<'ai' | 'json'>("ai");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [parsedQuiz, setParsedQuiz] = useState<Quiz | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPreset = Object.keys(PRESET_QUIZZES).some(
    (key) => key.toLowerCase() === topic.trim().toLowerCase()
  );

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    if (!value.trim()) {
      setJsonError(null);
      setParsedQuiz(null);
      return;
    }

    try {
      const raw = JSON.parse(value);
      const converted = convertCustomQuizToStandard(raw);
      
      // Validation checks
      if (!converted.quizTitle) {
        throw new Error("Missing quiz title or metadata.title");
      }
      if (!Array.isArray(converted.questions) || converted.questions.length === 0) {
        throw new Error("Questions must be a non-empty array");
      }
      
      setParsedQuiz(converted);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON format");
      setParsedQuiz(null);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      readFile(file);
    } else {
      setJsonError("Please drop a valid JSON file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleJsonChange(text);
    };
    reader.readAsText(file);
  };

  const handleLaunchImportedQuiz = () => {
    if (parsedQuiz && onImportQuiz) {
      onImportQuiz(parsedQuiz);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({
      topic: topic.trim(),
      targetAudience,
      difficulty,
      questionCount,
      includeTrueFalse,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn" id="quiz-setup-container">
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl card-shadow relative overflow-hidden">
        {/* Left vertical accent line */}
        <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 pl-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Quiz Configurator</h2>
              <p className="text-sm text-slate-500 font-medium">Formulate deep, intellectually stimulating quizzes.</p>
            </div>
          </div>
          
          {/* Setup Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start sm:self-center">
            <button
              type="button"
              onClick={() => setSetupMode("ai")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                setupMode === "ai"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Generator</span>
            </button>
            <button
              type="button"
              onClick={() => setSetupMode("json")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                setupMode === "json"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Custom JSON</span>
            </button>
          </div>
        </div>

        {setupMode === "ai" ? (
          <form onSubmit={handleSubmit} className="space-y-6 pl-2">
            {/* Topic selection */}
            <div className="space-y-2">
              <label htmlFor="topic-input" className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                Quiz Topic or Subject Area
              </label>
              <div className="relative">
                <input
                  id="topic-input"
                  type="text"
                  placeholder="e.g., Quantum Mechanics, French Revolution, Python Data Structures..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:opacity-60 transition-all text-sm md:text-base font-medium"
                />
                {!topic && (
                  <div className="absolute right-3.5 top-4 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded-full font-bold pointer-events-none">
                    <Sparkles className="w-3 h-3" />
                    AI Powered
                  </div>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="mt-4">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Suggested subjects (⚡ Instant Launch!)</span>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_SUGGESTIONS.map((s) => (
                    <button
                      key={s.topic}
                      type="button"
                      onClick={() => setTopic(s.topic)}
                      disabled={isLoading}
                      className={`px-3.5 py-2 text-xs rounded-xl border text-left flex items-center gap-2 transition-all option-btn ${
                        topic === s.topic
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md font-semibold"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-xs"
                      }`}
                    >
                      <span className="text-sm">{s.icon}</span>
                      <span>{s.topic}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5 ${
                        topic === s.topic ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 text-slate-500"
                      }`}>
                        <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span>Instant</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Target Audience */}
              <div className="space-y-2">
                <label htmlFor="audience-input" className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Target Audience
                </label>
                <input
                  id="audience-input"
                  type="text"
                  placeholder="e.g., High School Students, Trivia Buffs, Med Students"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:opacity-60 transition-all text-sm font-medium"
                />
                <p className="text-xs text-slate-400 font-medium">Calibrates vocabulary, scope, and background details.</p>
              </div>

              {/* Cognitive Difficulty */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-500" />
                  Cognitive Difficulty
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 border border-slate-200/50 rounded-2xl">
                  {(["Beginner", "Intermediate", "Advanced", "Expert"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      disabled={isLoading}
                      className={`py-2 text-xs font-bold rounded-xl transition-all option-btn ${
                        difficulty === level
                          ? "bg-white text-indigo-700 shadow-md"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-medium min-h-[32px]">
                  {difficulty === "Beginner" && "Recall core vocabulary, straightforward definitions."}
                  {difficulty === "Intermediate" && "Combine concepts, evaluate relationships, basic structures."}
                  {difficulty === "Advanced" && "Acknowledge tricky context, edge cases, and analytical caveats."}
                  {difficulty === "Expert" && "Extremely demanding high-level synthesis and technical logic."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Question count */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-500" />
                  Question Count
                </label>
                <div className="flex gap-2">
                  {[5, 8, 12, 15].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      disabled={isLoading}
                      className={`flex-1 py-2.5 text-sm font-bold border rounded-2xl transition-all option-btn ${
                        questionCount === count
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-medium">Selects the exact duration. 8-12 is highly recommended.</p>
              </div>

              {/* True/False integration */}
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/50 rounded-2xl h-[76px]">
                <div>
                  <span className="block text-sm font-bold text-slate-700">Mix True/False Checks</span>
                  <span className="text-xs text-slate-400 font-medium">Adds conceptual Boolean checks.</span>
                </div>
                <label htmlFor="toggle-tf" className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="toggle-tf"
                    type="checkbox"
                    checked={includeTrueFalse}
                    onChange={(e) => setIncludeTrueFalse(e.target.checked)}
                    disabled={isLoading}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {/* Submission button or loading indicator */}
            <div className="pt-6 border-t border-slate-100">
              {isLoading ? (
                <div className="space-y-3.5 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-center shadow-inner" id="setup-loading-indicator">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                  <p className="text-base font-bold text-indigo-900 animate-pulse">{loadingMessage}</p>
                  <p className="text-xs text-indigo-400 font-medium">Generative synthesis takes ~5 to 15 seconds. Please wait.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  id="generate-quiz-btn"
                  className={`w-full py-4 px-6 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2.5 option-btn text-base cursor-pointer ${
                    isPreset
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-900/15"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-900/15"
                  }`}
                >
                  {isPreset ? (
                    <>
                      <Zap className="w-4 h-4 fill-current text-amber-300" />
                      <span>⚡ Launch Instantly (0s Load)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current text-white/90" />
                      <span>Formulate Smart Quiz (AI Generated)</span>
                    </>
                  )}
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-6 pl-2 animate-fadeIn" id="json-import-container">
            {/* File Drag and Drop / Selection box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3.5 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50/40 text-indigo-900"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 text-slate-600"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".json"
                className="hidden"
              />
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600">
                <Upload className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-base">Drag & Drop Quiz JSON file here</p>
                <p className="text-xs text-slate-400 mt-1 font-semibold">or click to browse your desktop files</p>
              </div>
            </div>

            {/* Paste/Edit text area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Clipboard className="w-4 h-4 text-indigo-500" />
                  Paste Custom Quiz JSON
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleJsonChange(JSON.stringify({
                        quizMetadata: {
                          title: "Formula 1 Ground Effect & Venturi Dynamics",
                          estimatedTimeToComplete: "6 minutes",
                          totalXPPoints: 250
                        },
                        questions: [
                          {
                            id: "q1",
                            type: "MultipleChoice",
                            stem: "Which physical phenomenon is the primary catalyst for 'porpoising' (aerodynamic oscillation) in modern ground-effect Formula 1 cars?",
                            multipleChoiceData: {
                              options: [
                                "Complete boundary layer separation at the rear wing mainplane leading to sudden loss of downforce.",
                                "Aerodynamic stall within the Venturi tunnels due to flow separation at extremely low ride heights, causing the floor to lose suction and rise rapidly.",
                                "Excessive tire deflection at high speeds causing the physical floor edges to repeatedly strike the track surface.",
                                "The sudden collapse of the Y250 vortex structures as they interact with the front tire wake."
                              ],
                              correctAnswer: "Aerodynamic stall within the Venturi tunnels due to flow separation at extremely low ride heights, causing the floor to lose suction and rise rapidly."
                            },
                            points: 100,
                            explanation: "Porpoising is cyclic..."
                          }
                        ]
                      }, null, 2));
                    }}
                    className="text-[10px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-all"
                  >
                    Load Sample F1 JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJsonChange("")}
                    className="text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                value={jsonText}
                onChange={(e) => handleJsonChange(e.target.value)}
                placeholder='{ "quizMetadata": { "title": "My Quiz" }, "questions": [...] }'
                className="w-full h-64 px-4 py-3 bg-slate-900 text-emerald-400 placeholder-slate-600 border border-slate-800 rounded-2xl text-xs font-mono focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner resize-y leading-relaxed"
              />
            </div>

            {/* Parsing error warning */}
            {jsonError && (
              <div className="p-4 bg-rose-50 border border-rose-150 rounded-2xl flex items-start gap-2.5 text-rose-900 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-rose-800 mb-0.5">Parsing & Structure Errors</span>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed">{jsonError}</p>
                </div>
              </div>
            )}

            {/* Validation success details */}
            {parsedQuiz && !jsonError && (
              <div className="p-5 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-start gap-3 text-emerald-950 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-grow">
                  <span className="font-bold block text-emerald-800 text-sm">JSON Validation Successful</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600 font-semibold pt-1">
                    <div>
                      <span className="text-slate-400">Title:</span> <span className="text-slate-700">{parsedQuiz.quizTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Questions Loaded:</span> <span className="text-slate-700">{parsedQuiz.questions.length} items</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Mapped Topic:</span> <span className="text-slate-700">{parsedQuiz.topic}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Default Difficulty:</span> <span className="text-slate-700">{parsedQuiz.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action launcher button */}
            <div className="pt-6 border-t border-slate-100">
              <button
                type="button"
                disabled={!parsedQuiz || !!jsonError}
                onClick={handleLaunchImportedQuiz}
                className={`w-full py-4 px-6 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2.5 option-btn text-base ${
                  parsedQuiz && !jsonError
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-900/15 cursor-pointer"
                    : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60"
                }`}
              >
                <Zap className={`w-4 h-4 fill-current ${parsedQuiz ? "text-amber-300" : ""}`} />
                <span>⚡ Launch Custom Imported Quiz</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
