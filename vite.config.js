import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { assembleDist } from "./scripts/assemble-dist.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function assembleClewSite() {
  return {
    name: "assemble-clew-site",
    apply: "build",
    closeBundle() {
      assembleDist();
    },
  };
}

export default defineConfig({
  base: "/framework/",
  publicDir: false,
  plugins: [react(), assembleClewSite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: "/framework/",
  },
  build: {
    outDir: "dist/framework",
    emptyOutDir: true,
  },
});
