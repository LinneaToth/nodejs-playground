const deg = Number(process.argv[2]);
const fromUnit = process.argv[3].toLowerCase();
const convert = (deg, fromUnit) => {
    if (fromUnit != "c" && fromUnit != "f")
        return ("Hey I don't know what you're talking about, what is " + fromUnit + "??");
    const convertedDeg = fromUnit === "c" ? (deg * 2 + 30).toFixed(1) : ((deg - 30) / 2).toFixed(1);
    const toUnit = fromUnit === "c" ? "f" : "c";
    return `${deg}°${fromUnit.toUpperCase()} ≈ ${convertedDeg}°${toUnit.toUpperCase()}`;
};
console.log(convert(deg, fromUnit));
export {};
