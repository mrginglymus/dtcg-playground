import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [css(), sass()],
  outDir: "./dist/",
});
