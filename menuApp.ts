//Todo - lowercase input & storage name & species -> capitalize on presentation

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { writeFile, readFile, access } from "node:fs/promises";

type Pet = {
  name: string;
  species: string;
};

let activeChoice: number;
let appRunning = true;

const rl = createInterface({
  input: stdin,
  output: stdout,
});

const FILE = "pets.json";

const getPets = async () => {
  const content = await readFile(FILE, "utf-8");
  return JSON.parse(content);
};

const pets = await getPets();

const menuOptions = [
  "0: Exit the app",
  "1: List all pets",
  "2: Add a pet",
  "3: Delete a pet",
  "4: Delete all pets",
];

const showMenu = (optArr: string[]): void => {
  console.log("\n");
  console.log("These are your options:");
  optArr.forEach((option) => console.log(option));
};

const exitApp = () => {
  console.log("See you next time!");
  process.exit(1);
};

const listPets = () => {
  if (pets.length > 0) {
    console.log("Complete list of pets:");
    pets.map((pet: Pet) =>
      console.log(`- ${capitalize(pet.name)}, ${capitalize(pet.species)}`),
    );
    return;
  }
  console.log("No pets were found. Why don't you add some?");
};

const addPet = async () => {
  console.log("Let's add a pet!");
  const pet = { name: "", species: "" };
  pet.name = (await rl.question("What is your pets name? ")).toLowerCase();
  pet.species = (await rl.question("What species is it? ")).toLowerCase();
  pets.push(pet);
  try {
    await writeFile(FILE, JSON.stringify(pets), "utf-8");
    return;
  } catch (e) {
    console.error("Your pet wasn't saved.", e);
  }

  return;
};

const removePet = async () => {
  const petToRemove = (
    await rl.question("What is the name of the pet we should remove? ")
  ).toLowerCase();
  const rmPetIndex = pets.map((pet: Pet) => pet.name).indexOf(petToRemove);
  if (rmPetIndex >= 0) {
    pets.splice(rmPetIndex, 1);
    await writeFile(FILE, JSON.stringify(pets, null, "\t"), "utf-8"); //last arg in stringify() is indentation
    console.log("That's it. " + capitalize(petToRemove) + " is gone..");
    return;
  }
  console.log("Oops, I don't think we have a " + petToRemove);
  return;
};

const massExtinction = async () => {
  if (pets.length > 0) {
    pets.length = 0; //Way to clear array contents
    await writeFile(FILE, "[]", "utf-8");
    console.log(
      "What's wrong with you? All pets are gone. I hope you are happy.",
    );
    return;
  }
  console.log("Nothing to delete.");
  return;
};

const fileExists = async () => {
  try {
    await access(FILE);
  } catch {
    await writeFile(FILE, "[]", "utf-8");
  }
};

const capitalize = (petName: string) => {
  return String(petName).charAt(0).toUpperCase() + String(petName).slice(1);
};

await fileExists();

while (appRunning) {
  showMenu(menuOptions);

  try {
    activeChoice = Number(
      await rl.question("\n" + "What do you want to do?   "),
    );
  } catch (e) {
    console.error("Something went wrong: ", e);
    process.exit(1);
  }

  switch (activeChoice) {
    case 1:
      listPets();
      break;
    case 2:
      await addPet();
      break;
    case 3:
      await removePet();
      break;
    case 4:
      await massExtinction();
      break;
    case 0:
      exitApp();
    default:
      console.log("Try again!");
  }
}
