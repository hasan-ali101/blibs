import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "ContentScript",
      formats: ["iife"], // single self-executing file
      fileName: () => "content.js",
    },
    outDir: path.resolve(__dirname, "..", "extension"),
    emptyOutDir: false, // prevent deleting existing files
    cssCodeSplit: false,
    rollupOptions: {
      // prevent externalizing any deps (bundle everything)
      external: [],
      output: {
        globals: {},
      },
    },
    minify: "esbuild",
  },
});
