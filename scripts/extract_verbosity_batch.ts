/**
 * Extract EN and FR detailed explanations for a batch of IDs to compare verbosity.
 */
import { QUESTIONS_BANK } from '../src/questionsBank';
import { DETAILED_EXPLANATIONS_FR } from '../src/data/detailedExplanationsTranslations';
import * as fs from 'fs';

const start = parseInt(process.argv[2] || '1201', 10);
const end = parseInt(process.argv[3] || '1250', 10);

const output: Array<{ id: number; en: string; fr: string; enLen: number; frLen: number }> = [];

for (let id = start; id <= end; id++) {
  const q = QUESTIONS_BANK.find((x) => x.id === id);
  const en = (q?.detailedExplanation || '').trim();
  const fr = DETAILED_EXPLANATIONS_FR[id] || '';
  if (en) {
    output.push({ id, en, fr, enLen: en.length, frLen: fr.length });
  }
}

fs.writeFileSync(
  `scripts/verbosity_batch_${start}_${end}.json`,
  JSON.stringify(output, null, 2),
  'utf8'
);
console.log(`Wrote ${output.length} entries to scripts/verbosity_batch_${start}_${end}.json`);
