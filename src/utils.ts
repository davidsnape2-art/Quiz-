import { Quiz, Question } from "./types";

export function convertCustomQuizToStandard(raw: any): Quiz {
  // If it's already in standard format, return it with mild sanitization
  if (raw && Array.isArray(raw.questions) && typeof raw.quizTitle === "string") {
    return {
      quizTitle: raw.quizTitle,
      topic: raw.topic || "Custom Topic",
      difficulty: raw.difficulty || "Intermediate",
      questions: raw.questions.map((q: any, index: number) => ({
        questionNumber: q.questionNumber || index + 1,
        questionText: q.questionText || q.stem || "No question text provided.",
        questionType: q.questionType || (q.type === "TrueFalse" ? "TrueFalse" : q.type === "MatchingPairs" ? "MatchingPairs" : "MultipleChoice"),
        options: Array.isArray(q.options) ? q.options : (q.multipleChoiceData?.options || ["True", "False"]),
        correctAnswer: q.correctAnswer || q.multipleChoiceData?.correctAnswer || "",
        difficultyRating: q.difficultyRating || 5,
        hint: q.hint || "Analyze the options carefully.",
        detailedExplanation: q.detailedExplanation || q.explanation || "No explanation provided.",
        matchingPairsData: q.matchingPairsData
      }))
    };
  }

  // Handle the user's custom JSON format
  const quizTitle = raw.quizMetadata?.title || raw.title || "Custom Imported Quiz";
  const topic = raw.topic || raw.quizMetadata?.topic || "F1 Aerodynamics";
  const difficulty = raw.difficulty || "Intermediate";

  const questions: Question[] = (raw.questions || []).map((q: any, index: number) => {
    const questionNumber = index + 1;
    const questionText = q.stem || q.questionText || "No question text provided.";
    let questionType: 'MultipleChoice' | 'TrueFalse' | 'MatchingPairs' = 'MultipleChoice';
    let options: string[] = [];
    let correctAnswer = "";
    let matchingPairsData = undefined;

    if (q.type === "TrueFalse" || q.questionType === "TrueFalse") {
      questionType = "TrueFalse";
      options = ["True", "False"];
      correctAnswer = q.correctAnswer || q.multipleChoiceData?.correctAnswer || "True";
    } else if (q.type === "MatchingPairs" || q.questionType === "MatchingPairs") {
      questionType = "MatchingPairs";
      matchingPairsData = q.matchingPairsData;
      const left = q.matchingPairsData?.leftSide || [];
      const right = q.matchingPairsData?.rightSide || [];
      const correctParts = left.map((item: string, idx: number) => `${item} ➔ ${right[idx] || ""}`);
      correctAnswer = correctParts.join(" | ");
    } else {
      // MultipleChoice
      questionType = "MultipleChoice";
      options = Array.isArray(q.options) 
        ? q.options 
        : (q.multipleChoiceData?.options || q.choices || []);
      correctAnswer = q.correctAnswer || q.multipleChoiceData?.correctAnswer || "";
      
      if (options.length === 0) {
        options = [correctAnswer, "Option B", "Option C", "Option D"].filter(Boolean);
      }
      if (options.length < 4) {
        while (options.length < 4) {
          options.push(`Alternative Option ${options.length + 1}`);
        }
      }
    }

    return {
      questionNumber,
      questionText,
      questionType,
      options,
      correctAnswer,
      difficultyRating: q.difficultyRating || (q.points ? Math.min(10, Math.max(1, Math.round(q.points / 10))) : 5),
      hint: q.hint || "Read the question stem and explanations carefully.",
      detailedExplanation: q.detailedExplanation || q.explanation || "No explanation provided.",
      matchingPairsData
    };
  });

  return {
    quizTitle,
    topic,
    difficulty,
    questions
  };
}

function shuffleArray(arr: any[]) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
