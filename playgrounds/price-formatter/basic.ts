import { PriceFormatter } from "../../lib";

const formatterWithCountryCode = PriceFormatter.create({ location: "TR" });
const formatterWithLocation = PriceFormatter.create({ location: "en-GB" });

const price = 1234567.89;

const formattedPriceWithCountryCode = formatterWithCountryCode.format(price);
const formattedPriceWithLocation = formatterWithLocation.format(price);

console.log({
  price,
  formattedPriceWithCountryCode,
  formattedPriceWithLocation,
});
