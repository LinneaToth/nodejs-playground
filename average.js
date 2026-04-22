const values = process.argv.slice(2);
const sum = values.reduce((acc, curr) => acc + Number(curr), 0)

const avg = sum / values.length;

console.log(`Tal: [${values}], Summa: ${sum}, Medelvärde: ${avg}`);