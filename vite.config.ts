import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
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
