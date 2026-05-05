import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [
    css({
      permutations: [
        ...["light", "dark"].flatMap((mode) =>
          ["orange", "blue"].map((theme) => ({
            input: {
              mode,
              theme,
            },
            prepare: (css: string) => `.${theme}-${mode} {\n  ${css}\n}`,
          })),
        ),
      ],
    }),
  ],
  outDir: "./dist/",
});
