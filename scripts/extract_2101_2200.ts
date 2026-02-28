// Extract questions 2101-2200 for French translation
// Run: npx tsx scripts/extract_2101_2200.ts

import { QUESTIONS_BANK } from '../src/questionsBank';

const range = QUESTIONS_BANK.filter((q) => q.id >= 2101 && q.id <= 2200);
const output = range.map((q) => ({
  id: q.id,
  e: q.explanation,
  de: q.detailedExplanation ?? '',
}));
console.log(JSON.stringify(output, null, 2));
