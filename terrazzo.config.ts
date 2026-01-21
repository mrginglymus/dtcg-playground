import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import { BuildHookOptions } from "@terrazzo/parser";
import { makeCSSVar } from "@terrazzo/token-tools/css";

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [
    css(),
    sass(),
    {
      name: "my cool plugin",
      build(options: BuildHookOptions): Promise<void> {
        console.log(options);
        const rawTokens = options.getTransforms({ format: "css" });
        const rootDecls = [];
        for (const [setName, set] of Object.entries(
          options.resolver.source.sets,
        )) {
          for (const source of set.sources) {
            for (const tokenName of Object.keys(source)) {
              if (tokenName.startsWith("$")) {
                continue;
              }
              const token = rawTokens.find((t) => t.id === tokenName)!;
              rootDecls.push(`${makeCSSVar(token.localID)}: ${token.value};`);
            }
          }
        }

        for (const [modifierName, modifier] of Object.entries(
          options.resolver.source.modifiers,
        )) {
          console.log(modifierName);
          for (const [contextName, context] of Object.entries(
            modifier.contexts,
          )) {
            const modifierTokens = options.getTransforms({
              format: "css",
              input: {
                theme: "orange",
                mode: "light",
                [modifierName]: contextName,
              },
              id: Object.keys(context[0]),
            });
            console.log(contextName, Object.keys(context[0]));
            console.log("xxx", modifierTokens);
          }
        }

        console.log(rootDecls);
        // console.log(rawTokens);
        return;
      },
    },
  ],
  outDir: "./dist/",
});
