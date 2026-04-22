const personName = process.argv[2];
const period = process.argv[3];
if (process.argv[2] && process.argv[3]) {
    console.log(`God ${period}, ${personName}`);
}
else {
    console.log("TJENARE!");
}
export {};
