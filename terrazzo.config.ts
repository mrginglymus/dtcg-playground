import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [css({ legacyHex: true }), sass()],
  outDir: "./dist/",
});
