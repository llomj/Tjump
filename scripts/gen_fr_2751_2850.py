#!/usr/bin/env python3
"""
Generate French detailed explanations for IDs 2751-2850.
Reads from extract_fr_2726_2850.json, outputs TypeScript entries.
Uses structural translation: Key concepts->Concepts clés, etc.
"""
import json
import re

# Section header mappings EN -> FR
HEADERS = {
    "Key concepts": "Concepts clés",
    "How it works": "Comment ça fonctionne",
    "Example": "Exemple",
    "Common uses": "Usages courants",
    "Benefits": "Usages courants",
    "Edge cases": "Cas limites",
}

def translate_sections(text):
    """Convert English section headers to French, keep structure."""
    if not text or not isinstance(text, str):
        return text
    result = text
    for en, fr in HEADERS.items():
        # Match "Key concepts:" or "Key concepts:" at line start
        result = re.sub(rf"\b{re.escape(en)}\s*:", f"{fr} :", result, flags=re.IGNORECASE)
        result = re.sub(rf"\n{re.escape(en)}\s*:", f"\n{fr} :", result, flags=re.IGNORECASE)
    return result

def extract_and_translate(de_text):
    """Extract bullet points and translate section headers. Body stays English for now - 
    we'll do proper translation. This script creates the structure."""
    if not de_text:
        return ""
    # Just replace headers
    out = translate_sections(de_text)
    # Replace common English phrases with French
    phrases = [
        ("returns ", "renvoie "),
        ("Returns ", "Renvoie "),
        ("returns:", "renvoie :"),
        ("because ", "car "),
        ("Because ", "Car "),
        ("The ", "Le/La/Les "),  # Skip - too broad
    ]
    return out

def main():
    with open("scripts/extract_fr_2726_2850.json", encoding="utf-8") as f:
        data = json.load(f)
    
    # Filter 2751-2850
    entries = [e for e in data if 2751 <= e["id"] <= 2850]
    
    lines = []
    for e in entries:
        lid = e["id"]
        de = e.get("de", "")
        # For now use a simplified translation: structure + key terms
        fr = translate_sections(de)
        # Escape backticks and backslashes for TS template literal
        fr_escaped = fr.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
        # Split long strings if needed - TS allows multiline
        lines.append(f"  {lid}: `{fr_escaped}`,")
    
    with open("scripts/fr_2751_2850_output.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Generated {len(lines)} entries to scripts/fr_2751_2850_output.txt")

if __name__ == "__main__":
    main()
