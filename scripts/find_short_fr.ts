/**
 * Find French detailed explanations below 70% of English length.
 * Run: npx tsx scripts/find_short_fr.ts
 */
import { QUESTIONS_BANK } from '../src/questionsBank';
import { DETAILED_EXPLANATIONS_FR } from '../src/data/detailedExplanationsTranslations';
import * as fs from 'fs';

const THRESHOLD = 0.7; // fr.length must be >= en.length * 0.7

interface Entry {
  id: number;
  enLen: number;
  frLen: number;
  ratio: number;
}

const short: Entry[] = [];

for (const q of QUESTIONS_BANK) {
  const en = (q.detailedExplanation || '').trim();
  const fr = DETAILED_EXPLANATIONS_FR[q.id] || '';
  if (!en) continue;
  const enLen = en.length;
  const frLen = fr.length;
  const ratio = enLen > 0 ? frLen / enLen : 1;
  if (ratio < THRESHOLD) {
    short.push({ id: q.id, enLen, frLen, ratio });
  }
}

short.sort((a, b) => a.id - b.id);
const ids = short.map((x) => x.id);

fs.writeFileSync(
  'scripts/short_fr_ids.json',
  JSON.stringify({ count: short.length, ids, entries: short }, null, 2),
  'utf8'
);

console.log(`Found ${short.length} French explanations below 70% of EN length`);
console.log('IDs:', ids.join(', '));
