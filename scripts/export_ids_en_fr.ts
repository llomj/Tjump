// Export EN and FR for specific IDs to compare/expand
// Run: npx tsx scripts/export_ids_en_fr.ts

import { QUESTIONS_BANK } from '../src/questionsBank';
import { DETAILED_EXPLANATIONS_FR } from '../src/data/detailedExplanationsTranslations';

const TARGET_IDS = [
  17, 134, 319, 323, 345, 1256, 1284, 1495, 1496, 1497, 1498, 1500,
  1553, 1554, 1555, 1557, 1558, 1559, 1565, 1576, 1769, 1792, 1794, 1797, 1798, 1800, 2707
];

function main() {
  for (const id of TARGET_IDS) {
    const q = QUESTIONS_BANK.find((q) => q.id === id);
    const en = q?.detailedExplanation ?? '(no EN)';
    const fr = DETAILED_EXPLANATIONS_FR[id] ?? '(no FR)';

    const enLen = en.length;
    const frLen = fr.length;
    const ratio = enLen > 0 ? (frLen / enLen) : 0;
    const ok = ratio >= 0.9 ? '✓' : '✗';

    console.log('\n' + '='.repeat(90));
    console.log(`ID: ${id} | EN: ${enLen} | FR: ${frLen} | Ratio: ${(ratio * 100).toFixed(1)}% ${ok}`);
    console.log('-'.repeat(90));
    console.log('EN:');
    console.log(en);
    console.log('\nFR:');
    console.log(fr);
  }
}

main();
