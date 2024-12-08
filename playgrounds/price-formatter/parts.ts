import { PriceFormatter } from "../../lib";

const formatterWithCountryCode = PriceFormatter.create({ location: "TR" });
const formatterWithLocation = PriceFormatter.create({ location: "en-GB" });

const price = 1234567.89;

const formattedPriceWithCountryCode = formatterWithCountryCode.formatToParts(price);
const formattedPriceWithLocation = formatterWithLocation.formatToParts(price);

console.log({
  price,
  formattedPriceWithCountryCode,
  formattedPriceWithLocation,
});
