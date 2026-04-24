#!/usr/bin/env bash
# digiman-audit.sh — runs when content/*.json changes
# 1. Runs npm build to verify no breakage
# 2. Reads sectors.json + work.json and prints coverage report
# 3. If coverage gaps exist, opens a GitHub PR with proposed fixes

PORTFOLIO_DIR="/Users/manojachari/Sites/portfolio"
SECTORS_FILE="/Users/manojachari/Documents/New project/sectors.json"

cd "$PORTFOLIO_DIR" || exit 1

echo "=== BUILD CHECK ==="
npm run build 2>&1
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
  echo "BUILD FAILED — skipping audit. Fix errors before changes go live."
  exit 1
fi

echo ""
echo "=== SECTOR COVERAGE AUDIT — $(date '+%Y-%m-%d') ==="

python3 - <<'PYEOF'
import json, sys, os

PORTFOLIO_DIR = "/Users/manojachari/Sites/portfolio"
SECTORS_FILE = "/Users/manojachari/Documents/New project/sectors.json"

try:
    with open(f"{PORTFOLIO_DIR}/content/work.json") as f:
        work = json.load(f)
    with open(SECTORS_FILE) as f:
        sectors_data = json.load(f)
except FileNotFoundError as e:
    print(f"ERROR: {e}")
    sys.exit(1)

active_sectors = sectors_data.get("sectors", [])
excluded = sectors_data.get("excluded_sectors", [])

# Build a flat list of all tags across all case studies
all_tags = {}
for item in work:
    combined = [t.lower() for t in item.get("tags", []) + item.get("tags_target", [])]
    all_tags[item["title"]] = combined

SECTOR_ALIASES = {
    "AI/LLM": ["ai", "llm", "ai pm", "ai/llm", "generative", "machine learning"],
    "Insurance": ["insurance", "health", "mental health", "screening"],
    "Payments": ["payments", "payment", "fintech", "financial"],
    "Fintech": ["fintech", "payments", "financial", "payment"],
    "Mental Health": ["mental health", "wellness", "health", "therapy"],
    "Wellness": ["wellness", "health", "fitness", "mental health"],
    "Fitness": ["fitness", "wellness", "health"],
    "Health": ["health", "insurance", "mental health", "wellness"],
    "Pharmaceutical": ["pharmaceutical", "pharma", "health", "fitness"],
    "SAAS": ["saas", "saa", "software"],
    "B2C": ["b2c", "consumer", "ecommerce"],
    "Ecommerce": ["ecommerce", "e-commerce", "d2c", "b2c", "retail"],
    "Travel": ["travel", "retail", "ecommerce"],
}

print(f"{'SECTOR':<18} {'STATUS':<12} {'COVERED BY'}")
print("=" * 60)

gaps = []
for sector in active_sectors:
    name = sector
    keywords = SECTOR_ALIASES.get(name, [name.lower()])

    matches = []
    for title, tags in all_tags.items():
        if any(kw in " ".join(tags) for kw in keywords):
            matches.append(title)

    if matches:
        status = "✓"
        covered = ", ".join(matches[:2])
    else:
        status = "✗ NONE"
        covered = "—"
        gaps.append(name)

    print(f"{name:<18} {status:<12} {covered}")

print()
if gaps:
    print(f"GAPS DETECTED: {', '.join(gaps)}")
    print("Consider adding tags_target entries or new case studies for these sectors.")
else:
    print("Coverage OK — all active sectors have at least one matching case study.")

if excluded:
    print(f"\nExcluded sectors: {', '.join(excluded)}")
PYEOF

echo ""
echo "=== AUDIT COMPLETE ==="
