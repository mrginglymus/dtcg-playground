import { defineConfig } from "@terrazzo/cli";
import css, { Permutation } from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import { parse, ResolverModifier } from "@terrazzo/parser";
import fs from "node:fs/promises";

const { resolver, tokens } = await parse({
  filename: new URL("./resolver.json", import.meta.url),
  src: await fs.readFile("./resolver.json", "utf-8"),
});

const permutations: Permutation[] = [];
const allTokens = new Set(Object.keys(tokens));
const permutationTokens = new Set<string>();

for (const [modifier, { contexts }] of Object.entries<ResolverModifier>(
  resolver.source.modifiers!,
)) {
  const modifierTokens = new Set(Object.keys(Object.values(contexts)[0][0]));
  const modifierTokensExclude = allTokens.difference(modifierTokens);
  modifierTokens.values().forEach((t) => permutationTokens.add(t));
  for (const name of Object.keys(contexts)) {
    permutations.push({
      input: {
        [modifier]: name,
      },
      prepare(css: string): string {
        return `
        /* ignore: ${[...modifierTokensExclude].join(", ")} */
        .${modifier}-${name} {
          ${css}
        }
        `;
      },
      ignore: [...modifierTokensExclude],
    });
  }
}

permutations.unshift({
  input: {},
  ignore: [...permutationTokens],
  prepare(css: string): string {
    return `/* ignore: ${[...permutationTokens].join(", ")} */
    :root { 
    ${css} 
    }`;
  },
});

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [
    css({
      permutations,
    }),
    sass(),
  ],
  outDir: "./dist/",
});
