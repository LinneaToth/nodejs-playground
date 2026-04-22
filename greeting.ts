const personName: string = process.argv[2];
const period: string = process.argv[3];

if (process.argv[2] && process.argv[3]) {
  console.log(`God ${period}, ${personName}`);
} else {
  console.log("TJENARE!");
}
