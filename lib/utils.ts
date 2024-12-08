export const reverseString = (value: string) => {
  return value.split("").reverse().join("");
};

export const replaceAll = (
  value: string,
  search: string,
  replacement: string
) => {
  return value.split(search).join(replacement);
};

export const replaceDecimalSeperator = (
  value: string,
  oldSeperator: string,
  newSeperator: string
) => {
  return reverseString(
    reverseString(value).replace(oldSeperator, newSeperator)
  );
};

export const replaceThousandSeperator = (
  value: string,
  oldSeperator: string,
  newSeperator: string
) => {
  return replaceAll(value, oldSeperator, newSeperator);
};
