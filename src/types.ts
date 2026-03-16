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

// --- TJump Philosophy Explorer content types ---

export type PhilosophyTopic =
  | 'epistemology'
  | 'metaphysics'
  | 'ethics'
  | 'logic'
  | 'arguments'
  | 'debate_methods'
  | 'humor_style'
  | 'other';

export type ArgumentType =
  | 'cosmological'
  | 'teleological'
  | 'moral'
  | 'epistemic'
  | 'metaphysical'
  | 'pragmatic'
  | 'other';

export type DebateMode =
  | 'deductive'
  | 'inductive'
  | 'abductive'
  | 'bayesian'
  | 'probabilistic_reasoning'
  | 'socratic'
  | 'other';

export type ToneTag =
  | 'serious'
  | 'sarcastic'
  | 'playful'
  | 'dry'
  | 'neutral';

export type MethodologyTag =
  | 'bayesian_analysis'
  | 'thought_experiment'
  | 'intuition_pump'
  | 'model_comparison'
  | 'conceptual_analysis'
  | 'other';

export interface PhilosophyTags {
  topic: PhilosophyTopic;
  argument_type?: ArgumentType;
  debate_mode?: DebateMode;
  tone?: ToneTag;
  methodology?: MethodologyTag;
  source_video_id?: string;
  source_video_title?: string;
  year?: number;
}

export interface TranscriptSegment {
  timestamp: string; // "HH:MM:SS"
  text: string;
  context?: string;
}

export interface TranscriptEntry {
  id: string;
  videoTitle: string;
  topic: PhilosophyTopic;
  description?: string;
  segments: TranscriptSegment[];
  tags: PhilosophyTags;
}

export interface ConceptPage {
  id: string;
  title: string;
  topic: PhilosophyTopic;
  summary: string;
  tjumpPosition: string;
  transcriptExamples?: Array<{
    transcriptId: string;
    timestamp: string;
    excerpt: string;
  }>;
  relatedArguments?: string[]; // argument IDs
  relatedConcepts?: string[]; // concept IDs
  tags: PhilosophyTags;
}

export interface ArgumentPremiseStructure {
  premises: string[];
  conclusion: string;
}

export interface ArgumentPage {
  id: string;
  title: string;
  opponentClaim: string;
  premiseStructure: ArgumentPremiseStructure;
  tjumpResponse: string;
  counterArguments: string[];
  tags: PhilosophyTags;
}

export interface LogicalEvaluationScores {
  logicalValidity: number; // 0-10
  soundness: number; // 0-10
  coherence: number; // 0-10
  evidenceStrength: number; // 0-10
  debateStrength: number; // 0-10
  rhetoricalClarity: number; // 0-10
}

export interface LogicalEvaluation {
  argumentId: string;
  summaryVerdict: string;
  scores: LogicalEvaluationScores;
  notes?: {
    validity?: string;
    soundness?: string;
    coherence?: string;
    evidenceStrength?: string;
    debateStrength?: string;
    rhetoricalClarity?: string;
  };
}

export interface FallacyFlag {
  name: string;
  present: boolean;
  notes?: string;
}

export interface FallacyAnalysis {
  argumentId: string;
  fallacies: FallacyFlag[];
  overallComment?: string;
}

export interface MindMapNode {
  id: string;
  name: string;
  file?: string; // relative path to markdown file
  tags?: PhilosophyTags;
  children?: MindMapNode[];
}

