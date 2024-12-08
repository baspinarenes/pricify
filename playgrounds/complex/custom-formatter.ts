import { PriceFormatter } from "../../lib/entities";

export const formatter = new PriceFormatter({
  location: "TR",
  overridedSymbols: {
    TR: "TL",
    DE: "EUR",
  },
  template: {
    TR: "{thousand|.}{fraction|2|,} {currency}",
    DE: "{currency}{thousand|.}{fraction|2|,}",
  },
  trailingZeroDisplay: true,
});
