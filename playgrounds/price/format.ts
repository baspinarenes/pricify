import { Price } from "../../lib";

const price = new Price(12345.6789);

console.log("Formatted price as Euro:", price.format({ location: "DE" }));
console.log(
  "Formatted price as TL:",
  price.format({
    location: "GB",
    overridedSymbols: {
      GB: "€",
    },
  })
);
console.log(
  "Formatted price as TL:",
  price.format({
    location: "TR",
    overridedSymbols: {
      TR: "TL",
    },
    template: "{thousand|.}{fraction|2|,} {currency}",
  })
);
