import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import {
  BuildHookOptions,
  Plugin,
  TransformHookOptions,
} from "@terrazzo/parser";

const MyPlugin: Plugin = {
  name: "My Plugin",
  async transform(options: TransformHookOptions): Promise<void> {
    console.log(options);
  },
  async build(options: BuildHookOptions): Promise<void> {
    console.log(options);
  },
};

export default defineConfig({
  tokens: ["./resolver.json"],
  plugins: [css(), sass(), MyPlugin],
  outDir: "./dist/",
});
