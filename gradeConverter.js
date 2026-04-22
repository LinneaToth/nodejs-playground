const grade = Number(process.argv[2]);
if (grade < 0 || grade > 100) {
    console.log("I don't recognize that grade, you must be special ⚡");
    process.exit();
}
let convertedBetyg = "Okänt";
if (grade < 50) {
    convertedBetyg = "F";
}
else if (grade < 60) {
    convertedBetyg = "E";
}
else if (grade < 70) {
    convertedBetyg = "D";
}
else if (grade < 80) {
    convertedBetyg = "C";
}
else if (grade < 90) {
    convertedBetyg = "B";
}
else if (grade < 100) {
    convertedBetyg = "A";
}
console.log("Ditt betyg är: " + convertedBetyg);
export {};
