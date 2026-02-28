/**
 * Patch detailedExplanationsTranslations.ts with expanded FR for short IDs.
 * Run: npx tsx scripts/patch_detailed_fr.ts
 */
import * as fs from 'fs';

const expanded = JSON.parse(
  fs.readFileSync('scripts/expanded_fr_phrases.json', 'utf8')
) as Array<{ id: number; fr: string }>;

const tsPath = 'src/data/detailedExplanationsTranslations.ts';
let content = fs.readFileSync(tsPath, 'utf8');

function escapeForTs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function findTemplateLiteralEnd(str: string, start: number): number {
  let i = start;
  while (i < str.length) {
    const c = str[i];
    if (c === '\\') { i += 2; continue; }
    if (c === '`') return i;
    i++;
  }
  return -1;
}

for (const { id, fr } of expanded) {
  const escaped = escapeForTs(fr);
  const idPattern = new RegExp(`\\s${id}:\\s*\``);
  const match = content.match(idPattern);
  if (!match) {
    console.error(`Could not find ID ${id}`);
    continue;
  }
  const startIdx = content.indexOf(match[0]) + match[0].length;
  const endIdx = findTemplateLiteralEnd(content, startIdx);
  if (endIdx === -1) {
    console.error(`Could not find end of template for ID ${id}`);
    continue;
  }
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);
  content = before + escaped + after;
}

fs.writeFileSync(tsPath, content);
console.log(`Patched ${expanded.length} entries in ${tsPath}`);
