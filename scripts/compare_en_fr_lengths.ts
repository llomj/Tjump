// Compare EN vs FR detailed explanation lengths for specific IDs
// Run: npx tsx scripts/compare_en_fr_lengths.ts

import { QUESTIONS_BANK } from '../src/questionsBank';
import { DETAILED_EXPLANATIONS_FR } from '../src/data/detailedExplanationsTranslations';

const TARGET_IDS = [
  308, 315, 399, 400, 927, 928, 929,
  1472, 1473, 1474, 1475, 1476, 1478, 1479, 1480,
  1491, 1492, 1493, 1499, 2709
];

function main() {
  for (const id of TARGET_IDS) {
    const q = QUESTIONS_BANK.find((q) => q.id === id);
    const en = q?.detailedExplanation ?? '(no EN)';
    const fr = DETAILED_EXPLANATIONS_FR[id] ?? '(no FR)';

    const enLen = en.length;
    const frLen = fr.length;
    const ratio = enLen > 0 ? (frLen / enLen).toFixed(3) : 'N/A';

    console.log('\n' + '='.repeat(80));
    console.log(`ID: ${id}`);
    console.log('-'.repeat(80));
    console.log('EN (detailed explanation):');
    console.log(en.slice(0, 400) + (en.length > 400 ? '...' : ''));
    console.log('\nFR (DETAILED_EXPLANATIONS_FR):');
    console.log(fr.slice(0, 400) + (fr.length > 400 ? '...' : ''));
    console.log('\n--- LENGTHS ---');
    console.log(`EN length: ${enLen}`);
    console.log(`FR length: ${frLen}`);
    console.log(`Ratio FR/EN: ${ratio}`);
  }
  console.log('\n' + '='.repeat(80));
}

main();
