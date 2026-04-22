import { readFile } from "node:fs/promises";

const fileName = process.argv[2];

async function getFile(path: string) {
  if (!path) {
    console.log("You gave me nothing worth searching for");
    return;
  }

  try {
    const fileContents = await readFile(fileName, { encoding: "utf-8" });
    console.log(fileContents);
  } catch (e) {
    console.log(e);
  }
}

await getFile(fileName);
