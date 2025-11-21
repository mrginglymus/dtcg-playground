import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import fs from "node:fs/promises";

import { loadTokens } from "@terrazzo/cli";
import { Logger, parse } from "@terrazzo/parser";

const resolverUrl = pathToFileURL(
  fileURLToPath(import.meta.resolve("./resolver.json")),
);

const loadedTokens = await loadTokens([resolverUrl], {
  logger: new Logger({ level: "debug" }),
});

const { resolver } = await parse(loadedTokens!);

for (const perm of resolver.listPermutations()) {
  console.log(perm, resolver.apply(perm).primary.$value.hex);
}
