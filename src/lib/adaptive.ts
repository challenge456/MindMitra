export type Performance = {
  accuracy: number;
  completionTimeMs: number;
  mistakes: number;
  hintsUsed: number;
  difficulty: number;
  attempts: number;
};

export type AdaptiveRecommendation = {
  difficulty: number;
  decision: "easier" | "same" | "slightly-harder";
  message: string;
};

export function recommendDifficulty(current: Performance, history: Performance[] = []): AdaptiveRecommendation {
  const recent = [...history, current].slice(-3);
  const averageAccuracy = recent.reduce((sum, item) => sum + item.accuracy, 0) / recent.length;
  const averageHints = recent.reduce((sum, item) => sum + item.hintsUsed, 0) / recent.length;
  const comfortable = averageAccuracy >= 84 && averageHints <= 1 && current.mistakes <= 2;
  const needsSupport = averageAccuracy < 62 || averageHints >= 3 || current.mistakes >= 5;

  if (needsSupport) {
    return { difficulty: Math.max(1, current.difficulty - 1), decision: "easier", message: "Next time, we will use fewer items and keep helpful guidance available." };
  }
  if (comfortable) {
    return { difficulty: Math.min(3, current.difficulty + 1), decision: "slightly-harder", message: "You completed this comfortably. Next time, MindMitra can offer one small extra challenge." };
  }
  return { difficulty: current.difficulty, decision: "same", message: "This level looks comfortable. We will keep the next activity familiar and steady." };
}

export function compareSessions(previous: Performance | undefined, current: Performance) {
  if (!previous) return "This is a helpful starting point for future activity comparisons.";
  const accuracyImproved = current.accuracy > previous.accuracy;
  const fewerHints = current.hintsUsed < previous.hintsUsed;
  if (accuracyImproved && fewerHints) return "Recent sessions show higher matching accuracy and reduced hint usage.";
  if (accuracyImproved) return "Recent sessions show higher matching accuracy.";
  if (fewerHints) return "Recent sessions used fewer hints.";
  return "Recent sessions show a steady pattern of participation at this activity level.";
}
