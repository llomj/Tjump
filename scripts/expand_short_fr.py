#!/usr/bin/env python3
"""
Expand short French detailed explanations by translating full EN to FR.
Uses MyMemory API. Preserves Python code unchanged. Section headers translated.
Output: scripts/expanded_fr_output.json
"""
import json
import re
import urllib.parse
import urllib.request
import time

SECTION_MAP = {
    'Key concepts:': 'Concepts clés :',
    'Key concepts\n': 'Concepts clés :\n',
    'How it works:': 'Comment ça fonctionne :',
    'How it works\n': 'Comment ça fonctionne :\n',
    'Example:': 'Exemple :',
    'Example\n': 'Exemple :\n',
    'Examples:': 'Exemples :',
    'Examples\n': 'Exemples :\n',
    'Common uses:': 'Usages courants :',
    'Common uses\n': 'Usages courants :\n',
    'Benefits:': 'Usages courants :',
    'Edge cases:': 'Cas limites :',
    'Fix:': 'Correction :',
    'Note:': 'Note :',
    'Dictionary creation:': 'Création de dictionnaire :',
    'Empty dictionary:': 'Dictionnaire vide :',
    'dict() with no arguments:': 'dict() sans arguments :',
    'get() vs setdefault():': 'get() vs setdefault() :',
    'Benefits': 'Usages courants',
}

def translate_chunk(text):
    """Translate via MyMemory API. Preserves code."""
    if not text or not text.strip():
        return text
    stripped = text.strip()
    if (stripped.startswith('>>>') or stripped.startswith('class ') or
        stripped.startswith('def ') or stripped.startswith('from ') or
        stripped.startswith('import ') or
        (len(stripped) > 2 and stripped[0] in ' \t') or
        re.match(r'^[a-zA-Z_][a-zA-Z0-9_.]*\s*[=\(\.]', stripped)):
        return text
    try:
        url = 'https://api.mymemory.translated.net/get?' + urllib.parse.urlencode({
            'q': text[:4500], 'langpair': 'en|fr'
        })
        req = urllib.request.Request(url, headers={'User-Agent': 'Python/3'})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode())
        return data.get('responseData', {}).get('translatedText', text)
    except Exception as e:
        print(f"  API error ID {e}", file=__import__('sys').stderr)
        return text

def is_code_line(line):
    s = line.strip()
    if not s or s.startswith('•'): return False
    return (s.startswith('>>>') or s.startswith('class ') or s.startswith('def ') or
            s.startswith('from ') or s.startswith('import ') or
            (len(line) > 0 and line[0] in ' \t') or
            bool(re.match(r'^[a-zA-Z_][a-zA-Z0-9_.]*\s*(=\s|[\(\.])', s)) or
            bool(re.match(r'^[\{\}\[\],\'\"\d\s:#]+$', s)) or
            '#' in s and not s.strip().startswith('#'))

def split_preserve_code(text):
    lines = text.split('\n')
    blocks = []
    current = []
    current_is_code = None
    for line in lines:
        code_line = is_code_line(line)
        if current_is_code is None:
            current_is_code = code_line
            current.append(line)
        elif code_line == current_is_code:
            current.append(line)
        else:
            blocks.append(('\n'.join(current), current_is_code))
            current = [line]
            current_is_code = code_line
    if current:
        blocks.append(('\n'.join(current), current_is_code))
    return blocks

def translate_entry(en_text):
    """Translate to French, keep code unchanged."""
    for en, fr in SECTION_MAP.items():
        en_text = en_text.replace(en, fr)
    blocks = split_preserve_code(en_text)
    result = []
    for block, is_code in blocks:
        if is_code:
            result.append(block)
        else:
            paras = re.split(r'\n\n+', block)
            translated_paras = [translate_chunk(p) if p.strip() else p for p in paras]
            result.append('\n\n'.join(translated_paras))
    return '\n'.join(result)

def main():
    with open('scripts/short_fr_batch.json', encoding='utf-8') as f:
        data = json.load(f)
    out = []
    total = len(data)
    for i, item in enumerate(data):
        qid = item['id']
        en = item['en']
        print(f"  [{i+1}/{total}] ID {qid}...", flush=True)
        fr = translate_entry(en)
        out.append({'id': qid, 'fr': fr})
        time.sleep(0.35)  # Rate limit
    with open('scripts/expanded_fr_output.json', 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"Done. Wrote {len(out)} entries to scripts/expanded_fr_output.json")

if __name__ == '__main__':
    main()
