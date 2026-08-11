import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  // Honor the PORT assigned by the harness (autoPort) when present; otherwise
  // fall back to Vite's default. No hardcoded/strict port so parallel dev
  // servers don't collide.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  /* Ship modern syntax rather than down-levelled helpers. Every browser this
     site supports handles ES2022 natively, and the transpiled equivalents were
     showing up in Lighthouse's "legacy JavaScript" audit. */
  build: {
    target: "es2022",
  },
  esbuild: {
    target: "es2022",
  },
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
