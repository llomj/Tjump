/**
 * Export EN explanations for short FR IDs (for translation).
 * Run: npx tsx scripts/export_short_fr_batch.ts
 */
import { QUESTIONS_BANK } from '../src/questionsBank';
import { DETAILED_EXPLANATIONS_FR } from '../src/data/detailedExplanationsTranslations';
import * as fs from 'fs';

const THRESHOLD = 0.7;
const short = QUESTIONS_BANK.filter((q) => {
  const en = (q.detailedExplanation || '').trim();
  const fr = DETAILED_EXPLANATIONS_FR[q.id] || '';
  if (!en) return false;
  const ratio = en.length > 0 ? fr.length / en.length : 1;
  return ratio < THRESHOLD;
});

const data = short.map((q) => ({
  id: q.id,
  en: (q.detailedExplanation || '').trim(),
  fr: DETAILED_EXPLANATIONS_FR[q.id] || '',
}));

fs.writeFileSync('scripts/short_fr_batch.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Exported ${data.length} short FR entries to scripts/short_fr_batch.json`);
