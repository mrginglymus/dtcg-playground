import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import { BuildHookOptions } from "@terrazzo/parser";
import { makeCSSVar } from "@terrazzo/token-tools/css";

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [
    css({
      permutations: [
        {
          input: { theme: "orange", mode: "light" },
          prepare(css: string): string {
            return `.orange.light {${css}}`;
          },
        },
        {
          input: { theme: "orange", mode: "dark" },
          prepare(css: string): string {
            return `.orange.dark {${css}}`;
          },
        },
        {
          input: { theme: "blue", mode: "light" },
          prepare(css: string): string {
            return `.blue.light {${css}}`;
          },
        },
        {
          input: { theme: "blue", mode: "dark" },
          prepare(css: string): string {
            return `.blue.dark {${css}}`;
          },
        },
      ],
    }),
    sass(),
  ],
  outDir: "./dist/",
});
