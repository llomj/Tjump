/**
 * Scan French detailed explanations for remaining English content.
 * Outputs IDs that likely still have English. Run: node scripts/scan_fr_english.cjs
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/detailedExplanationsTranslations.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// English phrases that should NOT appear in French (prose - exclude code keywords like return, def)
const englishPhrases = [
  /\b(the |is |are |was |were |has |have |had |that |which |this |when |what |how |with |from |into |each |only |can |will |would |should |could |may |might |must )\b/,
  /\b(calls |returns |creates |allows |used |called |works |provides |requires |specifies |sets |gets |makes |takes |finds |executes |iterates |yields |passes |collects |contains |stores |triggers |preserves |assigns |receives |displays |holds |supports |produces |applied |raises |fails |expands |equivalent)\s/,
  /\b(It |They |We |You |This |That |The |A |An )\b/,
  /\b(of |to |for |and |or |but |in |on |at |by |as |if |so )\b/,
  /\b(overrides?|inherits?|implements?|defines?|creates?|returns?|calls?|sets?|gets?)\s+(the|a|an)\b/,
  /\b(When|If|Before|After|During|While) (the|a|an)\b/,
];

const entryRegex = /(\d+):\s*`([^`]+)`/g;
let m;
const problematic = [];

while ((m = entryRegex.exec(content)) !== null) {
  const id = parseInt(m[1]);
  const text = m[2];
  // Skip code blocks - lines that are mostly code (start with def, class, import, etc.)
  const lines = text.split('\n');
  let enCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip pure code lines
    if (/^\s*(def |class |import |from |#|print\(|return |if |for |while |try:|except)/.test(line)) continue;
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*\(/.test(trimmed)) continue;
    for (const pat of englishPhrases) {
      if (pat.test(line)) {
        enCount++;
        break;
      }
    }
  }
  if (enCount >= 2) {
    const sample = text.substring(0, 120).replace(/\n/g, ' ');
    problematic.push({ id, enCount, sample });
  }
}

problematic.sort((a, b) => b.enCount - a.enCount);
console.log('IDs with likely English content:', problematic.length);
console.log('\nTop 100 to fix:');
problematic.slice(0, 100).forEach(p => {
  console.log(`ID ${p.id} (${p.enCount} hits): ${p.sample}...`);
});
