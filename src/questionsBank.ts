import { Question, PersonaStage, SubLevel } from './types';
import { level1Patterns } from './data/questions/level1';
import { level1IntermediateA } from './data/questions/level1_intermediate_a';
import { level1IntermediateB } from './data/questions/level1_intermediate_b';
import { level1ExpertA } from './data/questions/level1_expert_a';
import { level1ExpertB } from './data/questions/level1_expert_b';
import { level2Patterns } from './data/questions/level2';
import { level2IntermediateA } from './data/questions/level2_intermediate_a';
import { level2IntermediateB } from './data/questions/level2_intermediate_b';
import { level2ExpertA } from './data/questions/level2_expert_a';
import { level2ExpertB } from './data/questions/level2_expert_b';
import { level3Patterns } from './data/questions/level3';
import { level3IntermediateA } from './data/questions/level3_intermediate_a';
import { level3IntermediateB } from './data/questions/level3_intermediate_b';
import { level3ExpertA } from './data/questions/level3_expert_a';
import { level3ExpertB } from './data/questions/level3_expert_b';
import { level4Patterns } from './data/questions/level4';
import { level4ForLoopPatterns } from './data/questions/level4_for_loops';
import { level4WhileBatch1 } from './data/questions/level4_while_batch1';
import { level4WhileLoopPatterns } from './data/questions/level4_while_loops';
import { level4WhileBatch3 } from './data/questions/level4_while_batch3';
import { level4WhileBatch4 } from './data/questions/level4_while_batch4';
import { level5Patterns } from './data/questions/level5';
import { level5IntermediateA } from './data/questions/level5_intermediate_a';
import { level5IntermediateB } from './data/questions/level5_intermediate_b';
import { level5ExpertA } from './data/questions/level5_expert_a';
import { level5ExpertB } from './data/questions/level5_expert_b';
import { level6Patterns } from './data/questions/level6';
import { level6IntermediateA } from './data/questions/level6_intermediate_a';
import { level6IntermediateB } from './data/questions/level6_intermediate_b';
import { level6ExpertA } from './data/questions/level6_expert_a';
import { level6ExpertB } from './data/questions/level6_expert_b';
import { level7Patterns } from './data/questions/level7';
import { level7IntermediateA } from './data/questions/level7_intermediate_a';
import { level7IntermediateB } from './data/questions/level7_intermediate_b';
import { level7ExpertA } from './data/questions/level7_expert_a';
import { level7ExpertB } from './data/questions/level7_expert_b';
import { level8Patterns } from './data/questions/level8';
import { level8IntermediateA } from './data/questions/level8_intermediate_a';
import { level8IntermediateB } from './data/questions/level8_intermediate_b';
import { level8ExpertA } from './data/questions/level8_expert_a';
import { level8ExpertB } from './data/questions/level8_expert_b';
import { level9Patterns } from './data/questions/level9';
import { level9IntermediateA } from './data/questions/level9_intermediate_a';
import { level9IntermediateB } from './data/questions/level9_intermediate_b';
import { level9ExpertA } from './data/questions/level9_expert_a';
import { level9ExpertB } from './data/questions/level9_expert_b';
import { level10Patterns } from './data/questions/level10';
import { level10IntermediateA } from './data/questions/level10_intermediate_a';
import { level10IntermediateB } from './data/questions/level10_intermediate_b';
import { level10ExpertA } from './data/questions/level10_expert_a';
import { level10ExpertB } from './data/questions/level10_expert_b';
import { QUESTIONS_PER_SUBLEVEL } from './constants';

// GENERATOR ENGINE
// Assigns BEGINNER for the first third, INTERMEDIATE for the second third, EXPERT for the last third.
// Each level has 300 questions (100 Beginner + 100 Intermediate + 100 Expert).
// Total: 3000 questions across 10 levels. IDs 1-3000.

const getSubLevel = (index: number, totalPatterns: number): SubLevel => {
  if (index < totalPatterns / 3) return SubLevel.BEGINNER;
  if (index < (totalPatterns * 2) / 3) return SubLevel.INTERMEDIATE;
  return SubLevel.EXPERT;
};

const generateLevel = (level: number, stage: PersonaStage, patterns: ((i: number) => any)[], startId: number) => {
  return Array.from({ length: patterns.length }, (_, i) => {
    const pattern = patterns[i](i);
    return {
      id: startId + i,
      level,
      subLevel: getSubLevel(i, patterns.length),
      persona_stage: stage,
      concept: "logic",
      difficulty: level > 7 ? 3 : (level > 4 ? 2 : 1),
      questionFormat: 'standard', // default format for existing questions
      question: pattern.q,
      options: pattern.o,
      correct_option_index: pattern.c,
      explanation: pattern.e,
      detailedExplanation: pattern.de || undefined
    } as Question;
  });
};

export const QUESTIONS_BANK: Question[] = [
  ...generateLevel(1, PersonaStage.PLANKTON, [...level1Patterns, ...level1IntermediateA, ...level1IntermediateB, ...level1ExpertA, ...level1ExpertB], 1),
  ...generateLevel(2, PersonaStage.SHRIMP, [...level2Patterns, ...level2IntermediateA, ...level2IntermediateB, ...level2ExpertA, ...level2ExpertB], 301),
  ...generateLevel(3, PersonaStage.CRAB, [...level3Patterns, ...level3IntermediateA, ...level3IntermediateB, ...level3ExpertA, ...level3ExpertB], 601),
  ...generateLevel(4, PersonaStage.SMALL_FISH, [...level4Patterns, ...level4ForLoopPatterns, ...level4WhileBatch1, ...level4WhileLoopPatterns, ...level4WhileBatch3, ...level4WhileBatch4], 901),
  ...generateLevel(5, PersonaStage.OCTOPUS, [...level5Patterns, ...level5IntermediateA, ...level5IntermediateB, ...level5ExpertA, ...level5ExpertB], 1201),
  ...generateLevel(6, PersonaStage.SEAL, [...level6Patterns, ...level6IntermediateA, ...level6IntermediateB, ...level6ExpertA, ...level6ExpertB], 1501),
  ...generateLevel(7, PersonaStage.DOLPHIN, [...level7Patterns, ...level7IntermediateA, ...level7IntermediateB, ...level7ExpertA, ...level7ExpertB], 1801),
  ...generateLevel(8, PersonaStage.SHARK, [...level8Patterns, ...level8IntermediateA, ...level8IntermediateB, ...level8ExpertA, ...level8ExpertB], 2101),
  ...generateLevel(9, PersonaStage.WHALE, [...level9Patterns, ...level9IntermediateA, ...level9IntermediateB, ...level9ExpertA, ...level9ExpertB], 2401),
  ...generateLevel(10, PersonaStage.GOD_WHALE, [...level10Patterns, ...level10IntermediateA, ...level10IntermediateB, ...level10ExpertA, ...level10ExpertB], 2701)
];
