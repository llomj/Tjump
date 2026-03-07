export enum SubLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  EXPERT = "Expert"
}

export type QuestionFormat = 'standard' | 'output' | 'bug' | 'blank';

export interface Question {
  id: number;
  level: number;
  persona_stage: string;
  concept: string;
  difficulty: number;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  detailedExplanation?: string; // Optional detailed, verbose explanation for learning
  subLevel?: SubLevel; // Optional for backwards compatibility, required for new questions
  questionFormat?: QuestionFormat; // Optional for new formats
}

export interface QuestionAttempt {
  id: number;
  question: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation: string;
  level: number;
  timestamp: number;
}

export enum PersonaStage {
  TADPOLE = "Tadpole",
  PLANKTON = "Plankton",
  SHRIMP = "Shrimp",
  CRAB = "Crab",
  SMALL_FISH = "Small Fish",
  OCTOPUS = "Octopus",
  SEAL = "Seal",
  DOLPHIN = "Dolphin",
  SHARK = "Shark",
  WHALE = "Whale",
  GOD_WHALE = "God Whale"
}

export interface IdLogEntry {
  id: number;
  question: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
}

export interface RandomModeStats {
  totalAnswered: number;
  totalCorrect: number;
  lastSessionScore?: number;
  lastSessionTotal?: number;
}

export interface UserStats {
  currentLevel: number;
  xp: number;
  xpRandom?: number; // XP earned in Random mode only (separate from level mode XP)
  totalAttempts?: number;
  completedQuestionIds: number[];
  highestUnlockedLevel: number;
  levelProgress: Record<number, number>;
  levelCorrect?: Record<number, number>; // total correct answers per level (level mode only), used for 5-star accuracy
  history: QuestionAttempt[];
  idLog: IdLogEntry[];
  lastSessionScore?: number;
  lastSessionTotal?: number;
  acquiredStars?: Record<number, number>; // deprecated for level mode; stars computed from levelCorrect/levelProgress
  randomModeStats?: RandomModeStats;
  randomMode?: boolean; // Persisted preference: Level vs Random mode
}

export interface LevelInfo {
  level: number;
  persona: PersonaStage;
  concepts: string[];
  description: string;
  color: string;
}
