#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const REPORT_DIR = path.join(ROOT, 'reports');
const REPORT_PATH = path.join(REPORT_DIR, 'en-fr-parity-report.md');

function loadTsModule(tsPath) {
  const source = fs.readFileSync(tsPath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const mod = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier.startsWith('.')) {
      const resolved = path.resolve(path.dirname(tsPath), specifier);
      if (fs.existsSync(resolved)) return require(resolved);
      if (fs.existsSync(`${resolved}.ts`)) return loadTsModule(`${resolved}.ts`);
      if (fs.existsSync(`${resolved}.tsx`)) return loadTsModule(`${resolved}.tsx`);
      if (fs.existsSync(`${resolved}.js`)) return require(`${resolved}.js`);
    }
    return require(specifier);
  };
  new Function('exports', 'module', 'require', compiled)(mod.exports, mod, localRequire);
  return mod.exports;
}

function extractRanges(ids) {
  if (!ids.length) return [];
  const out = [];
  let start = ids[0];
  let prev = ids[0];
  for (let i = 1; i < ids.length; i += 1) {
    const cur = ids[i];
    if (cur === prev + 1) {
      prev = cur;
      continue;
    }
    out.push([start, prev]);
    start = cur;
    prev = cur;
  }
  out.push([start, prev]);
  return out;
}

function formatRanges(ranges) {
  if (!ranges.length) return 'none';
  return ranges.map(([s, e]) => (s === e ? String(s) : `${s}-${e}`)).join(', ');
}

function countPatternInBlock(filePath, startPattern, endPattern, itemPattern) {
  const src = fs.readFileSync(filePath, 'utf8');
  const startIdx = src.indexOf(startPattern);
  if (startIdx === -1) return 0;
  const endIdx = src.indexOf(endPattern, startIdx);
  const block = endIdx === -1 ? src.slice(startIdx) : src.slice(startIdx, endIdx + endPattern.length);
  const matches = block.match(itemPattern);
  return matches ? matches.length : 0;
}

function analyzeUiParity(translations) {
  const missingInEn = [];
  const missingInFr = [];
  const typeMismatches = [];
  const placeholderMismatches = [];

  const placeholders = (s) => Array.from(s.matchAll(/\{([^}]+)\}/g)).map((m) => m[1]).sort().join(',');

  function walk(en, fr, pathKey) {
    const enObj = en && typeof en === 'object' && !Array.isArray(en);
    const frObj = fr && typeof fr === 'object' && !Array.isArray(fr);

    if (enObj || frObj) {
      if (!enObj || !frObj) {
        typeMismatches.push(pathKey || '<root>');
        return;
      }
      const keys = new Set([...Object.keys(en), ...Object.keys(fr)]);
      for (const key of keys) {
        const next = pathKey ? `${pathKey}.${key}` : key;
        if (!(key in en)) missingInEn.push(next);
        if (!(key in fr)) missingInFr.push(next);
        if (key in en && key in fr) walk(en[key], fr[key], next);
      }
      return;
    }

    if (Array.isArray(en) || Array.isArray(fr)) {
      if (!Array.isArray(en) || !Array.isArray(fr)) {
        typeMismatches.push(pathKey);
      } else if (en.length !== fr.length) {
        typeMismatches.push(`${pathKey} (array-length ${en.length} vs ${fr.length})`);
      }
      return;
    }

    if (typeof en === 'string' && typeof fr === 'string') {
      if (placeholders(en) !== placeholders(fr)) {
        placeholderMismatches.push(pathKey);
      }
      return;
    }

    if (typeof en !== typeof fr) {
      typeMismatches.push(`${pathKey} (${typeof en} vs ${typeof fr})`);
    }
  }

  walk(translations.en, translations.fr, '');
  return { missingInEn, missingInFr, typeMismatches, placeholderMismatches };
}

function main() {
  const translations = loadTsModule(path.join(ROOT, 'src/translations.ts')).translations;
  const shortFr = loadTsModule(path.join(ROOT, 'src/data/shortExplanationsTranslations.ts')).SHORT_EXPLANATIONS_FR;
  const detailedFr = loadTsModule(path.join(ROOT, 'src/data/detailedExplanationsTranslations.ts')).DETAILED_EXPLANATIONS_FR;

  const ui = analyzeUiParity(translations);

  const shortIds = Object.keys(shortFr).map(Number).sort((a, b) => a - b);
  const shortMissing = [];
  for (let id = 1; id <= 3000; id += 1) {
    if (!shortFr[id]) shortMissing.push(id);
  }

  const detailedIds = Object.keys(detailedFr).map(Number).sort((a, b) => a - b);
  const detailedMissing = [];
  for (let id = 1; id <= 3000; id += 1) {
    if (!detailedFr[id]) detailedMissing.push(id);
  }

  const constantsPath = path.join(ROOT, 'src/constants.ts');
  const glossaryFrPath = path.join(ROOT, 'src/data/glossaryTranslations.ts');
  const opsViewPath = path.join(ROOT, 'src/components/OperationsView.tsx');
  const opsFrPath = path.join(ROOT, 'src/data/operationsTranslations.ts');

  const enGlossaryCount = countPatternInBlock(
    constantsPath,
    'export const GLOSSARY = [',
    '];',
    /\bterm:\s*"/g
  );
  const frGlossaryCount = (fs.readFileSync(glossaryFrPath, 'utf8').match(/\bterm:\s*"/g) || []).length;

  const enOpsCount = countPatternInBlock(
    opsViewPath,
    'const OPERATIONS_DATA: OperationItem[] = [',
    '];',
    /title:\s*"/g
  );
  const enMathCount = countPatternInBlock(
    opsViewPath,
    'const MATH_CONCEPTS_DATA: OperationItem[] = [',
    '];',
    /title:\s*"/g
  );
  const frOpsCount = countPatternInBlock(
    opsFrPath,
    'export const OPERATIONS_DATA_FR: OperationItem[] = [',
    '];',
    /title:\s*"/g
  );
  const frMathCount = countPatternInBlock(
    opsFrPath,
    'export const MATH_CONCEPTS_DATA_FR: OperationItem[] = [',
    '];',
    /title:\s*"/g
  );

  const detailedSource = fs.readFileSync(path.join(ROOT, 'src/data/detailedExplanationsTranslations.ts'), 'utf8');
  const englishLeadCount = (detailedSource.match(/^\s*\d+:\s*`(?:The|When|If|In)\b/gm) || []).length;

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

  const now = new Date();
  const stamp = now.toISOString();

  const report = `# EN-FR Parity Report

Generated: ${stamp}

## 1) UI translation keys parity (\`src/translations.ts\`)

- Missing keys in EN: ${ui.missingInEn.length}
- Missing keys in FR: ${ui.missingInFr.length}
- Type mismatches: ${ui.typeMismatches.length}
- Placeholder mismatches: ${ui.placeholderMismatches.length}

## 2) Short explanations coverage (\`src/data/shortExplanationsTranslations.ts\`)

- FR entries present: ${shortIds.length} / 3000
- Missing IDs: ${shortMissing.length}
- Missing ranges: ${formatRanges(extractRanges(shortMissing))}

## 3) Detailed explanations coverage (\`src/data/detailedExplanationsTranslations.ts\`)

- FR entries present: ${detailedIds.length} / 3000
- Missing IDs: ${detailedMissing.length}
- Missing ranges: ${formatRanges(extractRanges(detailedMissing))}

## 4) Glossary parity

- EN glossary entries: ${enGlossaryCount}
- FR glossary entries: ${frGlossaryCount}
- Delta (FR - EN): ${frGlossaryCount - enGlossaryCount}

## 5) Operations & Math parity

- EN operations entries: ${enOpsCount}
- FR operations entries: ${frOpsCount}
- EN math entries: ${enMathCount}
- FR math entries: ${frMathCount}

## 6) French quality heuristics

- Detailed FR entries with English-leading opening pattern (\`The|When|If|In\`): ${englishLeadCount}

## Summary

- UI parity status: ${ui.missingInFr.length === 0 && ui.typeMismatches.length === 0 && ui.placeholderMismatches.length === 0 ? 'PASS' : 'FAIL'}
- Short explanation coverage status: ${shortMissing.length === 0 ? 'PASS' : 'FAIL'}
- Detailed explanation coverage status: ${detailedMissing.length === 0 ? 'PASS' : 'FAIL'}
- Glossary parity status: ${frGlossaryCount === enGlossaryCount ? 'PASS' : 'WARN'}
- Operations parity status: ${frOpsCount === enOpsCount && frMathCount === enMathCount ? 'PASS' : 'WARN'}
`;

  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`Report written: ${path.relative(ROOT, REPORT_PATH)}`);
}

main();
