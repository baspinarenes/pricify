import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ tsconfigPath: "./tsconfig.json" })],
  build: {
    outDir: "dist",
    minify: "esbuild",

    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "pricify",
      fileName: (format, entryName) => (format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`),
      formats: ["es", "cjs"],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ["big.js"],
  },
});
