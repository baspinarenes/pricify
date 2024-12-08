import { PriceFormatter } from "../../lib";

const location = "US";

const formatter1 = PriceFormatter.create({
  location,
  template: "{thousand|.}{fraction|2|,} {currency}",
});

const formatter2 = PriceFormatter.create({
  location,
  template: "{thousand|.}{fraction|2|,} {currency}",
  trailingZeroDisplay: true,
});

const price = 200;
const formattedPrice1 = formatter1.format(price);
const formattedPrice2 = formatter2.format(price);

console.log({ price, formattedPrice1, formattedPrice2 });
