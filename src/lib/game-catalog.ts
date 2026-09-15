export type GameId =
  | "tile-memory"
  | "picture-pairs"
  | "missing"
  | "arrows"
  | "number-grid"
  | "routine"
  | "story"
  | "categories"
  | "instrument"
  | "tambola";

export type GameDefinition = {
  id: GameId;
  title: string;
  category: "Memory" | "Attention" | "Recall" | "Sequencing" | "Recognition" | "Northeast";
  icon: string;
  description: string;
  instructions: string;
  focus: string;
};

export const games: GameDefinition[] = [
  { id: "tile-memory", title: "Tile Memory Matcher", category: "Memory", icon: "◈", description: "Remember positions and discover matching pairs.", instructions: "Look at the tiles, then find the matching pairs. Take your time.", focus: "Visual memory" },
  { id: "picture-pairs", title: "Picture Pair Memory", category: "Memory", icon: "✿", description: "Match familiar objects and moments.", instructions: "Turn over two cards to find a pair.", focus: "Recognition" },
  { id: "missing", title: "What's Missing?", category: "Recall", icon: "?", description: "Notice which familiar item has disappeared.", instructions: "Study the objects, then select the missing one.", focus: "Recall" },
  { id: "arrows", title: "Arrow Attention", category: "Attention", icon: "➜", description: "Follow one clear direction at a time.", instructions: "Choose the arrow you see.", focus: "Attention" },
  { id: "number-grid", title: "Number Grid Matcher", category: "Attention", icon: "12", description: "Find the next number in a friendly grid.", instructions: "Select numbers in order, starting with 1.", focus: "Number attention" },
  { id: "routine", title: "Daily Routine Sequencer", category: "Sequencing", icon: "☷", description: "Arrange a familiar day in a natural order.", instructions: "Tap each activity in the order it usually happens.", focus: "Sequencing" },
  { id: "story", title: "Story Recall", category: "Recall", icon: "◌", description: "Listen to a small story, then answer a simple question.", instructions: "Read or listen, then choose the best answer.", focus: "Story recall" },
  { id: "categories", title: "Object Categorization", category: "Recognition", icon: "▦", description: "Sort everyday items into familiar groups.", instructions: "Choose the category that suits the item.", focus: "Classification" },
  { id: "instrument", title: "Instrument Tune Identifier", category: "Northeast", icon: "♫", description: "Recognize original instrument-inspired tones.", instructions: "Listen to the simple tone, then name the instrument.", focus: "Audio recognition" },
  { id: "tambola", title: "Adaptive Tambola", category: "Northeast", icon: "◉", description: "A calm, large-print number game.", instructions: "Find each called number on your board.", focus: "Number recognition" },
];

export const gameById = (id: GameId) => games.find((game) => game.id === id)!;
