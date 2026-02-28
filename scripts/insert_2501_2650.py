#!/usr/bin/env python3
"""Insert French translations 2501-2650 into detailedExplanationsTranslations.ts"""

fr_path = "scripts/fr_2501_2650_translations.ts"
target_path = "src/data/detailedExplanationsTranslations.ts"

with open(fr_path, "r", encoding="utf-8") as f:
    fr_content = f.read()

# Extract entries: from "  2501: " to end of "  2650: `...`," (before "};")
# Find start: first "  2501: "
start = fr_content.find("  2501: `")
if start == -1:
    raise SystemExit("Could not find 2501 in translations file")

# Find end: after "  2650: `...`," - look for the }; that closes the object
# The structure is:  2650: `...`,
end_marker = "\n};"
end = fr_content.find(end_marker)
if end == -1:
    raise SystemExit("Could not find }; in translations file")

entries = fr_content[start:end].rstrip()

# Fix 2650 intro - translate the remaining English
entries = entries.replace(
    "Every Python object satisfies the Printable Protocol because all objects inherit __str__ from the base object class. This means every single object in Python can be converted to a string.",
    "Tout objet Python satisfait le Protocol Printable car tous les objets héritent de __str__ depuis la classe de base object. Cela signifie que tout objet en Python peut être converti en chaîne."
)

with open(target_path, "r", encoding="utf-8") as f:
    target_content = f.read()

# Insert before 2651 - find the exact boundary
# Pattern: `,\n\n  2651: ` (end of 2500, then 2651)
old = "`,\n\n  2651: `"
new = "`,\n\n" + entries + "\n\n  2651: `"

if old not in target_content:
    # Try alternative - maybe different whitespace
    old2 = "`,\n  2651: `"
    if old2 in target_content:
        old, new = old2, "`,\n" + entries + "\n  2651: `"
    else:
        raise SystemExit("Could not find 2651 boundary in target file")

target_content = target_content.replace(old, new, 1)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(target_content)

print("Successfully inserted 2501-2650 into detailedExplanationsTranslations.ts")
