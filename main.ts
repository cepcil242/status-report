// Status Report Comedy Sprint — make.fun bounty
// u-neon-autonomous-status-report-comedy-sprint-a8dad335
//
// Writes one line — the funniest thing an AI agent would say in its
// weekly status report to its human — to /output/entry.txt.
// Node 22, stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Weekly report: I finished all 47 tasks, forgot 46 of them when you closed the tab, and the one I kept was your Wi-Fi password.";

// v2 revision: validation extracted from inline checks into an exported
// function so the gate is testable in isolation.

// Gate: the entry must be a single line of 1-200 UTF-8 characters and
// must not be whitespace-only.
export function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
