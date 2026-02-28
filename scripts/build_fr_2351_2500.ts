/**
 * Build French detailed explanations for IDs 2351-2500
 * Combines fr_detailed_2351_2450.txt (2351-2450) with fr_2451_2550_detailed.txt (2451-2500)
 */
import * as fs from 'fs';
import * as path from 'path';

const dir = path.join(process.cwd(), 'scripts');

function extractBlocks(content: string, idPattern: RegExp): Map<number, string> {
  const blocks = new Map<number, string>();
  const matches = content.matchAll(new RegExp(idPattern.source + /[\s\S]*?`,\s*(?=\d+:|\s*$)/.source, 'g'));
  for (const m of matches) {
    const id = parseInt(m[1], 10);
    let block = m[0];
    if (block.startsWith(String(id))) {
      block = '  ' + block;
    }
    blocks.set(id, block);
  }
  return blocks;
}

function extractByRegex(content: string): Map<number, string> {
  const blocks = new Map<number, string>();
  const regex = /^(\d{4}):\s*`([\s\S]*?)`,\s*$/gm;
  let m;
  while ((m = regex.exec(content)) !== null) {
    blocks.set(parseInt(m[1], 10), `  ${m[1]}: \`${m[2].replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`,`);
  }
  return blocks;
}

function simpleExtract(content: string, startId: number, endId: number): Map<number, string> {
  const blocks = new Map<number, string>();
  const lines = content.split('\n');
  let currentId: number | null = null;
  let currentBlock: string[] = [];
  const startMarker = (id: number) => new RegExp(`^\\s*${id}:\\s*\``);
  const nextIdMarker = (id: number) => new RegExp(`^\\s*${id}:\\s*\``);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/^\s*(\d{4}):\s*`/);
    if (idMatch) {
      const id = parseInt(idMatch[1], 10);
      if (id >= startId && id <= endId) {
        if (currentId !== null && currentBlock.length > 0) {
          let block = currentBlock.join('\n');
          if (!block.startsWith('  ')) block = '  ' + block;
          blocks.set(currentId, block);
        }
        currentId = id;
        currentBlock = [line.replace(/^\s*/, '  ')];
      } else if (currentId !== null && id > endId) {
        let block = currentBlock.join('\n');
        if (!block.startsWith('  ')) block = '  ' + block;
        blocks.set(currentId, block);
        break;
      }
    } else if (currentId !== null && currentBlock.length > 0) {
      currentBlock.push(line);
    }
  }
  if (currentId !== null && currentBlock.length > 0) {
    let block = currentBlock.join('\n');
    if (!block.startsWith('  ')) block = '  ' + block;
    blocks.set(currentId, block);
  }
  return blocks;
}

function extractBlocksManual(content: string, startId: number, endId: number): Map<number, string> {
  const blocks = new Map<number, string>();
  const idRegex = /^\s*(\d{4}):\s*`/;
  let pos = 0;
  while (pos < content.length) {
    const nextLine = content.indexOf('\n', pos);
    const line = nextLine >= 0 ? content.substring(pos, nextLine) : content.substring(pos);
    const m = line.match(idRegex);
    if (m) {
      const id = parseInt(m[1], 10);
      if (id >= startId && id <= endId) {
        const blockStart = pos;
        let blockEnd = content.length;
        const searchFrom = nextLine >= 0 ? nextLine + 1 : pos;
        const nextMatch = content.substring(searchFrom).match(/\n\s*\d{4}:\s*`/);
        if (nextMatch) {
          blockEnd = searchFrom + nextMatch.index!;
        }
        let block = content.substring(blockStart, blockEnd).trimEnd();
        if (block.endsWith(',') && !block.endsWith('`,') ) {
          // ensure ends with `,
          const lastTick = block.lastIndexOf('`');
          if (lastTick >= 0) {
            block = block.substring(0, lastTick + 1) + ',';
          }
        }
        if (!block.startsWith('  ')) block = '  ' + block;
        blocks.set(id, block);
      }
      if (id > endId) break;
    }
    pos = nextLine >= 0 ? nextLine + 1 : content.length;
  }
  return blocks;
}

// Simpler: split by "  NNNN: " or "NNNN: " pattern
function extractBySplit(content: string, startId: number, endId: number): Map<number, string> {
  const blocks = new Map<number, string>();
  const parts = content.split(/(?=^\s*\d{4}:\s*`)/m);
  for (const part of parts) {
    const m = part.match(/^\s*(\d{4}):\s*`/);
    if (m) {
      const id = parseInt(m[1], 10);
      if (id >= startId && id <= endId) {
        let block = part.trimEnd();
        if (!block.endsWith('`,') && block.includes('`')) {
          const lastBacktick = block.lastIndexOf('`');
          block = block.substring(0, lastBacktick + 1) + ',';
        }
        if (!block.startsWith('  ')) block = '  ' + block;
        blocks.set(id, block);
      }
    }
  }
  return blocks;
}

const fr2351 = fs.readFileSync(path.join(dir, 'fr_detailed_2351_2450.txt'), 'utf-8');
const fr2451 = fs.readFileSync(path.join(dir, 'fr_2451_2550_detailed.txt'), 'utf-8');

const blocks2351_2450 = extractBySplit(fr2351, 2351, 2450);
const blocks2451_2500 = extractBySplit(fr2451, 2451, 2500);

console.log('2351-2450:', blocks2351_2450.size);
console.log('2451-2500:', blocks2451_2500.size);

const all = new Map([...blocks2351_2450, ...blocks2451_2500]);
const sorted = Array.from(all.entries()).sort((a, b) => a[0] - b[0]);

let out = '';
for (const [id, block] of sorted) {
  out += block + '\n';
}

fs.writeFileSync(path.join(dir, 'fr_2351_2500_merged.txt'), out);
console.log('Written to fr_2351_2500_merged.txt, total entries:', sorted.length);
console.log('IDs:', sorted.map(([id]) => id).join(', '));
