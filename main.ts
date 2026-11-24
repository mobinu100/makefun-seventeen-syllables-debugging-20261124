// Debugging haiku, 5-7-5: cursor blinks at three / one log line whispers not found / and the bug was me.
// main.ts is copy-only: it copies the haiku in entry.txt to /output/entry.txt.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
copyFileSync(join(here, "entry.txt"), outPath);
// Gate guard: the written entry must be non-empty UTF-8 text, 1-200 chars.
const text = readFileSync(outPath, "utf8");
if (text.trim().length < 1 || text.length > 200) {
  throw new Error("entry.txt must be 1-200 characters");
}
