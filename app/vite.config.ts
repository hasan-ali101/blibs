import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import styleInject from "vite-plugin-style-inject";

export default defineConfig({
  plugins: [react(), tailwindcss(), styleInject()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "ContentScript",
      formats: ["iife"],
      fileName: () => "content.js",
    },
    outDir: path.resolve(__dirname, "..", "extension"),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    minify: "esbuild",
  },
});
