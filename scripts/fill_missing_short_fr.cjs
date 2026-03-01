#!/usr/bin/env node
/*
 * Fill missing French short explanations in src/data/shortExplanationsTranslations.ts
 * using existing translation artifacts in scripts/.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const shortTsPath = path.join(ROOT, 'src/data/shortExplanationsTranslations.ts');

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
      if (fs.existsSync(`${resolved}.js`)) return require(`${resolved}.js`);
    }
    return require(specifier);
  };
  new Function('exports', 'module', 'require', compiled)(mod.exports, mod, localRequire);
  return mod.exports;
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function firstSentence(frText) {
  const normalized = frText.replace(/\r\n/g, '\n').trim();
  if (!normalized) return '';
  const firstParagraph = normalized.split('\n\n')[0].replace(/\s+/g, ' ').trim();
  const match = firstParagraph.match(/^(.+?[.!?])(?:\s|$)/);
  if (match && match[1].length >= 24) return match[1].trim();
  return firstParagraph;
}

function toTsStringLiteral(text) {
  return JSON.stringify(text);
}

function run() {
  const shortModule = loadTsModule(shortTsPath);
  const shortMap = { ...shortModule.SHORT_EXPLANATIONS_FR };

  const missingRanges = [
    [1251, 1300],
    [1951, 2050],
    [2451, 2550],
  ];

  const neededIds = [];
  for (const [start, end] of missingRanges) {
    for (let id = start; id <= end; id += 1) neededIds.push(id);
  }

  const fr2451 = loadJson(path.join(ROOT, 'scripts/fr_2451_2550_short.json'));
  const batch1251 = loadJson(path.join(ROOT, 'scripts/verbosity_batch_1251_1300.json'));
  const batch1951 = loadJson(path.join(ROOT, 'scripts/verbosity_batch_1951_2000.json'));
  const batch2001 = loadJson(path.join(ROOT, 'scripts/verbosity_batch_2001_2050.json'));
  const detailedFr = loadTsModule(path.join(ROOT, 'src/data/detailedExplanationsTranslations.ts')).DETAILED_EXPLANATIONS_FR;

  const frDetailedById = new Map();
  for (const row of [...batch1251, ...batch1951, ...batch2001]) {
    if (row && Number.isInteger(row.id) && typeof row.fr === 'string' && row.fr.trim()) {
      frDetailedById.set(row.id, row.fr.trim());
    }
  }

  const additions = [];
  for (const id of neededIds) {
    if (shortMap[id]) continue;
    let fr = '';
    if (id >= 2451 && id <= 2550 && typeof fr2451[String(id)] === 'string') {
      fr = fr2451[String(id)].trim();
    } else {
      const longFr = frDetailedById.get(id) || detailedFr[id] || '';
      fr = firstSentence(longFr);
    }
    if (!fr) {
      throw new Error(`Missing French source for ID ${id}`);
    }
    additions.push({ id, fr });
  }

  additions.sort((a, b) => a.id - b.id);

  const source = fs.readFileSync(shortTsPath, 'utf8');
  const marker = '\n};\n\n/**\n * Returns the short explanation in the correct language.';
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error('Could not find insertion marker in shortExplanationsTranslations.ts');
  }

  const header = '\n  // Added missing FR short explanations (ID parity fill)\n';
  const lines = additions.map(({ id, fr }) => `  ${id}: ${toTsStringLiteral(fr)},`).join('\n');
  const insert = `${header}${lines}\n`;

  const updated = `${source.slice(0, markerIndex)}${insert}${source.slice(markerIndex)}`;
  fs.writeFileSync(shortTsPath, updated, 'utf8');

  console.log(`Added ${additions.length} missing short FR entries.`);
  console.log(`ID range: ${additions[0].id}..${additions[additions.length - 1].id}`);
}

run();
