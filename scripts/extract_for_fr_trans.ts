// Extract English detailed explanations for French translation
// Run: npx tsx scripts/extract_for_fr_trans.ts

import { QUESTIONS_BANK } from '../src/questionsBank';
import * as fs from 'fs';

const ids1 = [2726, 2727, 2728, 2729, 2730];
const ids2 = Array.from({ length: 100 }, (_, i) => 2751 + i);
const allIds = [...ids1, ...ids2];

const questions = QUESTIONS_BANK.filter((q) => allIds.includes(q.id)).sort((a, b) => a.id - b.id);
const output = questions.map((q) => ({
  id: q.id,
  q: q.question,
  de: q.detailedExplanation || q.explanation || '',
}));

fs.writeFileSync('scripts/extract_fr_2726_2850.json', JSON.stringify(output, null, 2));
console.log(`Extracted ${output.length} questions to scripts/extract_fr_2726_2850.json`);
