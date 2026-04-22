import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { writeFile } from "node:fs/promises";

const readLine = createInterface({
  input: stdin,
  output: stdout,
});

try {
  const fileName = await readLine.question("What should we call your file?");
  if (fileName.length === 0) {
    console.error("You need to name your file something");
    process.exit(1);
  }
  const content = await readLine.question(
    "What should we store in that file of yours?",
  );

  await writeFile(`./${fileName}.txt`, content, "utf-8");
  process.exit(1);
} catch (e) {
  console.error("No file for you, so sorry", e);
  process.exit(1);
}
