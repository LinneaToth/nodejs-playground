import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { writeFile, readFile, access } from "node:fs/promises";
let activeChoice;
let appRunning = true;
const rl = createInterface({
    input: stdin,
    output: stdout,
});
const menuOptions = [
    "0: Exit the app",
    "1: List all pets",
    "2: Add a pet",
    "3: Delete a pet",
];
const showMenu = (optArr) => {
    console.log("\n");
    console.log("These are your options:");
    optArr.forEach((option) => console.log(option));
};
const fileExists = async () => {
    try {
        await access("./pets.json");
    }
    catch {
        await writeFile("pets.json", "[]", "utf-8");
    }
};
const getPets = async () => {
    const content = await readFile("pets.json", "utf-8");
    return JSON.parse(content);
};
await fileExists();
while (appRunning) {
    showMenu(menuOptions);
    try {
        activeChoice = Number(await rl.question("\n" + "What do you want to do?   "));
    }
    catch (e) {
        console.error("Something went wrong: ", e);
        process.exit(1);
    }
    const pets = await getPets();
    //Todo - error handling
    //Todo - definetypes
    switch (activeChoice) {
        case 1:
            if (pets.length > 0) {
                console.log("Complete list of pets:");
                pets.map((pet) => console.log(`- ${pet.name}, ${pet.species}`));
                break;
            }
            console.log("No pets were found. Why don't you add some?");
            break;
        case 2:
            console.log("Let's add a pet!");
            const pet = { name: "", species: "" };
            pet.name = await rl.question("What is your pets name? ");
            pet.species = await rl.question("What species is it? ");
            pets.push(pet);
            await writeFile("pets.json", JSON.stringify(pets), "utf-8");
            break;
        case 3:
            //Todo - check if the pet exists.
            const petToRemove = await rl.question("What is the name of the pet we should remove? ");
            const rmPetIndex = pets
                .map((pet) => pet.name)
                .indexOf(petToRemove);
            if (rmPetIndex >= 0) {
                pets.splice(rmPetIndex, 1);
                await writeFile("pets.json", JSON.stringify(pets, null, 2), "utf-8");
                console.log("That's it. " + petToRemove + " is gone..");
                break;
            }
            console.log("Oops, I don't think we have a " + petToRemove);
            break;
        case 0:
            console.log("See you next time!");
            process.exit(1);
        default:
            console.log("Try again!");
    }
}
