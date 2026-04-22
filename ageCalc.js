const birthYear = process.argv[2];
const curYear = new Date().getFullYear();
const age = Number(curYear) - Number(birthYear);
console.log(`Grattis, du är ${age} år gammal!`);
export {};
