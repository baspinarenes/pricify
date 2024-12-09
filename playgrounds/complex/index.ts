import { formatter } from "./custom-formatter";

type Prices = {
  originalPrice: number;
  discountedPrice: number;
  sellingPrice: number;
};

const mapPrices = (price: Prices) => {
  return {
    unitInfo: {
      price: formatter.formatToParts(price.originalPrice),
    },
    originalPrice: price.originalPrice,
    originaPriceText: formatter.format(price.originalPrice),
  };
};

const mappedPrices = mapPrices({
  originalPrice: 167.434,
  discountedPrice: 150.2,
  sellingPrice: 130,
});

console.log(mappedPrices);
