//Let's get this running
console.log("Hello World");
//How do arguments work?
console.log("Argumentarrayen: ", process.argv);
if (process.argv[2]) {
    console.log("Hey, you wrote " + process.argv[2]);
}
export {};
