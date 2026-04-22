const toBeFormatted = process.argv[2];
const formatMethod = process.argv[3];

const reverseString = (str: string) => {
  const strArr: string[] = [...str];
  return strArr.reverse().join("");
};

if (formatMethod === "upper") console.log(toBeFormatted.toUpperCase());

if (formatMethod === "lower") console.log(toBeFormatted.toLowerCase());

if (formatMethod === "reverse") console.log(reverseString(toBeFormatted));
