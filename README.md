# :moneybag: Pricify

A lightweight, flexible JavaScript library for formatting prices in different currencies and customizing price templates.

## Installation

You can install via your favorite package manager:

```bash
npm install pricify
yarn add pricify
pnpm install pricify
```

## Usage

### Basic Formatting

To format a price, you can use the `format()` method which supports both raw numbers and `Price` objects.

```javascript
import { PriceFormatter } from "pricify";

const formatterWithCountryCode = PriceFormatter.create({ location: "TR" });
const formatterWithLocation = PriceFormatter.create({ location: "en-GB" });

const price = 1234567.89;

console.log(formatterWithCountryCode.format(price);)
console.log(formatterWithLocation.format(price));
```

### Override Currencies

**PriceFormatter** supports to override default currency symbols.

```javascript
const formatter = PriceFormatter.create({
  location: process.env.LOCATION || "GB",
  overridedSymbols: {
    TR: "TL",
    GB: "€", // € instead of £
  },
});

const price = 1234567.89;

console.log(formatter.format(price));
/* Output:
€1,234,567.89
*/
```

#### Custom Templates

You can define custom templates to format the price output according to your specific needs. Templates allow you to specify how the integer and decimal parts should be formatted, as well as the positioning of the currency.

```javascript
export const formatter = new PriceFormatter({
  location: "TR",
  overridedSymbols: {
    TR: "TL",
  },
  template: "{thousand|.}{fraction|2|,} {currency}",
  trailingZeroDisplay: true,
});

console.log(formatter.format(1234.5));
console.log(formatter.format(12.423));
console.log(formatter.format(12.564));

/* Output:
1.234,50 TL
12,42 TL
12,57 TL
*/
```

### Price Instance

The `Price` object is used for price management and allows you to store and manipulate prices with more flexibility.

```javascript
import { Price } from "pricify";

const price = new Price(1234.56);

console.log(pricify.increase(10));
console.log(pricify.round(1));
console.log(pricify.format(price));

/* Output:
1244.6
$1,244.6
*/
```

## API

### Price

A class provides various methods for handling price-related operations such as increasing, decreasing, applying discounts, rounding, and formatting.

#### Properties

| Name        | Type   | Description                       |
| ----------- | ------ | --------------------------------- |
| \* `amount` | number | The numerical value of the price. |

#### Methods

##### `equal(price: number | Price): boolean`

Compares the current price with another price to determine if they are equal.

**Parameters**:

- `price`: The price to compare with. This can be a `number` or a `Price` instance.

**Return Value**: Returns `true` if the prices are equal, otherwise `false`.

---

##### `increase(price: number): Price`

Increases the current price by a specified amount.

**Parameters**:

- `price`: The price to increase the price by. This should be a positive number.

**Return Value**: Returns the current `Price` instance, allowing for method chaining.

---

##### `decrease(price: number): Price`

Decreases the current price by a specified amount.

**Parameters**:

- `price`: The price to decrease the price by. This should be a positive number.

**Return Value**: Returns the current `Price` instance, allowing for method chaining.

---

##### `discount(percentage: number): Price`

Applies a discount to the current price based on a specified percentage.

**Parameters**:

- `percentage`: The discount percentage to apply (between 0 and 100).

**Return Value**: Returns the current `Price` instance after applying the discount.

---

##### `round(decimal: number, mode: "up" | "down" | "nearest" = "nearest"): Price`

Rounds the current price to a specified number of decimal places.

**Parameters**:

- `decimal`: The number of decimal places to round the price to. This should be a positive number.
- `mode`: The rounding mode. One of the following:
  - `"up"`: Always rounds up.
  - `"down"`: Always rounds down.
  - `"nearest"` (default): Rounds to the nearest value.

**Return Value**: Returns the current `Price` instance with the rounded value.

---

##### `format(options: PricifyConfig): string`

Formats the current price according to the specified options.

**Parameters**:

- `options`: The options for formatting the price. These options are passed to the `PriceFormatter` instance.

**Return Value**: A formatted string representation of the price.

### PriceFormatter

A class responsible for formatting price values according to different locales, custom templates, and specific rules for currency and price display.

#### Properties

| Name                  | Type                     | Description                                                                                                                                                                                           |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \* `location`         | string                   | Determine the local currency format and other region-specific formatting rules.<br>Example: `tr`, `GB`, `tr-TR`                                                                                       |
| `template`            | string                   | Apply template used to format the price.<br>Placeholders:<br> - {thousand\|delimeter}<br>- {fraction\|precision\|delimeter} <br>- {currency}<br>Example: `"{thousand\|.}{fraction\|2\|,} {currency}"` |
| `overridedSymbols`    | Record<location, string> | Override currency symbols. Useful when needing to display custom symbols or characters for specific currencies. <br>Example: `{ TR: "TL", "tr-TR": "TL" }`                                            |
|                       |
| `trailingZeroDisplay` | boolean                  | Determine whether trailing zeros.<br>If `true` then $2.00 -> $2                                                                                                                                       |
|                       |

#### Methods

#### `create(options: PricifyConfig): PriceFormatter`

Creates a new instance of the `PriceFormatter` class with the provided options.

**Parameters**:

- `options`: The options for configuring the `PriceFormatter` instance. These options include `location`, `template`, `trailingZeroDisplay`, and `overridedSymbols`.

**Return Value**: Returns a new instance of the `PriceFormatter`.

---

#### `format(price: number): string`

Formats the provided `amount` or `Price` according to the formatter's options.

**Parameters**:

- `price`: The price to format. This can be a `number` or a `Price` instance.

**Return Value**: A formatted string representation of the price.

---

#### `formatToParts(price: number): { currency: string, price: string }`

Formats the provided `amount` or `Price` according to the formatter's options.

**Parameters**:

- `price`: The price to format. This can be a `number` or a `Price` instance.

**Return Value**: The method returns an object containing two properties:

- currency: The currency symbol.
- price: A string representing the formatted price, with the currency symbol removed.

## Example

Here’s a complete example of using:

```typescript custom-formatter.ts
// custom-formatter.ts

import { PriceFormatter } from "pricify";

export const formatter = new PriceFormatter({
  location: process.env.FORCED_SINGLE_LOCATION ? "TR" : process.env.LOCATION,
  overridedSymbols: {
    TR: "TL",
    AZN: "TL",
  },
  template: "{thousand|.}{fraction|2|,} {currency}",
  trailingZeroDisplay: true,
});
```

```typescript index.ts
// index.ts

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

/* Output: 
{
  unitInfo: {
    price: {
      value: 167.43,
      currency: 'TL',
      formatted: '167,43',
      display: '167,43 TL'
    }
  },
  originaPriceText: '167,43 TL'
}
*/
```

## Contributing

We welcome contributions. To get started:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and write tests if applicable.
4. Submit a pull request.

## License

PriceFormatter is licensed under the [MIT License](LICENSE).
