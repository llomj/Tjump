/**
 * Generate French detailed explanations for IDs 2751-2850
 * Run: npx tsx scripts/gen_fr_2751_2850.ts
 */

import * as fs from 'fs';
import { QUESTIONS_BANK } from '../src/questionsBank';

// Section headers only - keep Python code and output unchanged
function translateBlock(de: string): string {
  return de
    .replace(/\bKey concepts:\s*/g, 'Concepts clés : ')
    .replace(/\bHow it works:\s*/g, 'Comment ça fonctionne : ')
    .replace(/\bExample:\s*/g, 'Exemple : ')
    .replace(/\bExamples:\s*/g, 'Exemple : ')
    .replace(/\bCommon uses:\s*/g, 'Usages courants : ')
    .replace(/\bBenefits:\s*/g, 'Usages courants : ')
    .replace(/\bEdge cases:\s*/g, 'Cas limites : ');
}

const range = QUESTIONS_BANK.filter((q) => q.id >= 2751 && q.id <= 2850);
const lines: string[] = [];

for (const q of range) {
  const de = q.detailedExplanation ?? q.explanation ?? '';
  const fr = translateBlock(de);
  const escaped = fr.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  lines.push(`  ${q.id}: \`${escaped}\`,`);
}

const block = lines.join('\n');
fs.writeFileSync('scripts/fr_2751_2850_generated.txt', block);
console.log('Wrote scripts/fr_2751_2850_generated.txt with', lines.length, 'entries');
