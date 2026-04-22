import { readdir } from "node:fs/promises";

const files = await readdir("../../");
files.forEach(file => console.log(file));

