import { PriceFormatter } from "../../lib";

const location = "GB"; // dynamic country code input

const formatter = PriceFormatter.create({
  location,
  overridedSymbols: {
    TR: "TL",
    GB: "€", // € instead of £
  },
});

const price = 1234567.89;
const formattedPrice = formatter.format(price);

console.log({ price, formattedPrice });
