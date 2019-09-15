const polishChars = [
  { code: "%C4%84", char: "Ą" },
  { code: "%C4%86", char: "Ć" },
  { code: "%C4%98", char: "Ę" },
  { code: "%C5%81", char: "Ł" },
  { code: "%C5%83", char: "Ń" },
  { code: "%C3%93", char: "Ó" },
  { code: "%C5%9A", char: "Ś" },
  { code: "%C5%B9", char: "Ź" },
  { code: "%C5%BB", char: "Ż" },
  { code: "%C4%85", char: "ą" },
  { code: "%C4%87", char: "ć" },
  { code: "%C4%99", char: "ę" },
  { code: "%C5%82", char: "ł" },
  { code: "%C5%84", char: "ń" },
  { code: "%C3%B3", char: "ó" },
  { code: "%C5%9B", char: "ś" },
  { code: "%C5%BA", char: "ź" },
  { code: "%C5%BC", char: "ż" }
];

export default (string: string) => {
  let parsedString = string;
  polishChars.forEach(char => {
    parsedString = parsedString.replace(char.code, char.char);
  });
  return parsedString
};
