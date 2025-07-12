export type Difficulty = {
  id: string;
  name: string;
};

export type GameSession = {
  sessionId: string;
  difficulty: Difficulty;
  wordLength: number;
};

export type LetterResult = {
  letter: string;
  solution: 'correct' | 'elsewhere' | 'absent';
};