#!/usr/bin/env bash
# digiman-watch.sh — file watcher daemon for Digiman
# Watches content/*.json for changes, triggers a portfolio audit on save.
# Runs as a launchd agent — starts on login, restarts on crash.

PORTFOLIO_DIR="/Users/manojachari/Sites/portfolio"
CONTENT_DIR="$PORTFOLIO_DIR/content"
LOG_FILE="$PORTFOLIO_DIR/logs/digiman-watch.log"
AUDIT_SCRIPT="$PORTFOLIO_DIR/scripts/digiman-audit.sh"
DEBOUNCE_SECONDS=3

mkdir -p "$PORTFOLIO_DIR/logs"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log "Digiman watcher started. Watching: $CONTENT_DIR"

LAST_RUN=0

fswatch -r -e ".*" -i ".*\.json$" "$CONTENT_DIR" | while read -r changed_file; do
  NOW=$(date +%s)
  DELTA=$((NOW - LAST_RUN))

  # Debounce: skip if last run was less than N seconds ago
  if [ "$DELTA" -lt "$DEBOUNCE_SECONDS" ]; then
    continue
  fi

  LAST_RUN=$NOW
  log "Change detected: $changed_file"
  log "Running Digiman audit..."

  bash "$AUDIT_SCRIPT" >> "$LOG_FILE" 2>&1

  log "Audit complete."
done
