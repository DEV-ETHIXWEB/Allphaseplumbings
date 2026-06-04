#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const files = execSync(
  `git ls-files "src/**/*.ts" "src/**/*.tsx" "src/**/*.js" "src/**/*.jsx" "src/**/*.css"`,
  { encoding: "utf8" },
)
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

let changed = 0;
let totalReplacements = 0;

for (const f of files) {
  const orig = readFileSync(f, "utf8");
  let out = orig;

  // Strip em-dashes in user-visible text. Apply in order:
  // " — " (with spaces both sides) -> ", "
  out = out.replace(/ — /g, ", ");
  // " —\n" or " —$" (em-dash at end of line/clause) -> ","
  out = out.replace(/ —(?=[\s)])/g, ",");
  // "— " (em-dash followed by space) -> ", "
  out = out.replace(/— /g, ", ");
  // "—" remaining (mid-word, e.g. "word—word") -> ", "
  out = out.replace(/—/g, ", ");
  // Cleanup: ",," or ", ," -> ","
  out = out.replace(/,\s*,/g, ",");
  // Cleanup: "  " (double space, but preserve indentation)
  out = out.replace(/(\S) {2,}(\S)/g, "$1 $2");
  // Cleanup: " ," -> ","
  out = out.replace(/ ,/g, ",");

  if (out !== orig) {
    writeFileSync(f, out);
    changed++;
    const count = (orig.match(/—/g) || []).length;
    totalReplacements += count;
    console.log(`  ${f}  (${count})`);
  }
}

console.log(`\n${changed} files changed, ${totalReplacements} em-dashes replaced.`);
