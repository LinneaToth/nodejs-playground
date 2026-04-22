//https://nodejsdesignpatterns.com/blog/reading-writing-files-nodejs/

import { writeFile } from "node:fs/promises";

const fileName = process.argv[2];
const fileContent = process.argv[3];

const writeToFile = async (fName: string, fContent: string) => {
  try {
    await writeFile(fName, fContent, "utf-8");
    console.log("Yay, din fil är sparad!");
  } catch (e) {
    console.error("Filskapandet misslyckades");
    throw e;
  }
};

writeToFile(fileName, fileContent);
