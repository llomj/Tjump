#!/usr/bin/env python3
"""Insert French detailed explanations 2101-2200 into detailedExplanationsTranslations.ts"""

ts_path = "src/data/detailedExplanationsTranslations.ts"
fr_path = "scripts/fr_detailed_2101_2200.ts"

with open(ts_path) as f:
    ts_content = f.read()

with open(fr_path) as f:
    fr_lines = f.readlines()

# Skip comment lines (//), get the 2101-2200 block
fr_block = "".join(l for l in fr_lines if not l.strip().startswith("//")).strip()

# Insert before "  2201: " - that's the first entry after the gap
# Our block ends with "  2200: `...`," so we need newline before 2201
insert_marker = "  2201: `"
if insert_marker not in ts_content:
    # Try 2651 if 2201 doesn't exist
    insert_marker = "  2651: `"

if insert_marker in ts_content:
    new_content = ts_content.replace(
        insert_marker,
        fr_block + "\n" + insert_marker
    )
    with open(ts_path, "w") as f:
        f.write(new_content)
    print(f"Inserted 2101-2200 successfully before {insert_marker[:15]}...")
else:
    print("Could not find insertion point (  2201: or   2651:)")
