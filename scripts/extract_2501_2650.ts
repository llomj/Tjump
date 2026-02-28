// Extract questions 2501-2650 with de (detailed explanation) for French translation
import { QUESTIONS_BANK } from '../src/questionsBank';
import * as fs from 'fs';

const qs = QUESTIONS_BANK.filter(q => q.id >= 2501 && q.id <= 2650);
const out = qs.map(q => ({
  id: q.id,
  de: q.detailedExplanation || ''
}));
fs.writeFileSync('scripts/extracted_2501_2650.json', JSON.stringify(out, null, 2));
console.log(`Extracted ${out.length} questions to scripts/extracted_2501_2650.json`);
