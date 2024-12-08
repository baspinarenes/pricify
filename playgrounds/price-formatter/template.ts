import { PriceFormatter } from "../../lib";

const location = "TR";

const formatter1 = PriceFormatter.create({
  location,
  overridedSymbols: {
    TR: "TL",
  },
  template: "{thousand|.}{fraction|4|,} {currency}",
});

const formatter2 = PriceFormatter.create({
  location,
  overridedSymbols: {
    TR: "TL",
  },
  template: "{thousand|.}{fraction|2|,}",
});

const price = 1234567.89;
const formattedPrice1 = formatter1.format(price);
const formattedPrice2 = formatter2.format(200);

console.log({ price, formattedPrice1, formattedPrice2 });
