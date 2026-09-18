/**
 * Runs the chatbot scenario suite: bundles the TypeScript test file with
 * esbuild (resolving the "@/…" alias from tsconfig) and executes it with
 * Node's built-in test runner. No extra dependencies.
 *
 *   npm run test:chatbot
 */
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const outDir = mkdtempSync(join(tmpdir(), "chatbot-tests-"));
const outfile = join(outDir, "chatbot.test.mjs");

try {
  await build({
    entryPoints: [join(here, "chatbot.test.ts")],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile,
    tsconfig: join(root, "tsconfig.json"),
    logLevel: "warning",
  });
  const res = spawnSync(process.execPath, ["--test", "--test-reporter=spec", outfile], {
    stdio: "inherit",
    env: { ...process.env, TZ: "UTC" },
  });
  process.exitCode = res.status ?? 1;
} finally {
  rmSync(outDir, { recursive: true, force: true });
}
