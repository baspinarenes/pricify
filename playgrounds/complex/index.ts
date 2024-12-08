import { formatter } from "./custom-formatter";

type Prices = {
  originalPrice: number;
  discountedPrice: number;
  sellingPrice: number;
};

const mapPrices = (price: Prices) => {
  return {
    originaPriceText: formatter.format(price.originalPrice),
    discountedPriceText: formatter.format(price.discountedPrice),
    sellingPriceText: formatter.format(price.sellingPrice),
  };
};

const mappedPrices = mapPrices({
  originalPrice: 0,
  discountedPrice: 150.2,
  sellingPrice: 130,
});

console.log(mappedPrices);
