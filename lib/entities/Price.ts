import { PriceFormatter } from "./PriceFormatter";
import type { PricifyConfig } from "../types";
import { ceil, divide, equal, floor, minus, multiply, plus, round } from "../utils/math";

export class Price {
  value: number;

  constructor(value: number) {
    this.validator.price(value);
    this.value = value;
  }

  static equal(value1: number, value2: number): boolean {
    return equal(value1, value2);
  }

  increase(value: number): Price {
    this.validator.price(value);
    this.value = plus(this.value, value);
    return this;
  }

  decrease(value: number): Price {
    this.validator.price(value);
    this.validator.substraction(this.value, value);
    this.value = minus(this.value, value);
    return this;
  }

  discount(percentage: number): Price {
    this.validator.percentage(percentage);
    this.decrease(divide(multiply(this.value, percentage), 100));
    return this;
  }

  round(precision: number, mode: "up" | "down" | "nearest" = "nearest"): Price {
    this.validator.precision(precision);

    switch (mode) {
      case "up":
        this.value = ceil(this.value, precision);
        break;
      case "down":
        this.value = floor(this.value, precision);
        break;
      case "nearest":
        this.value = round(this.value, precision);
        break;
    }

    return this;
  }

  equal(price: number): boolean;
  equal(price: Price): boolean;
  equal(price: number | Price): boolean {
    return equal(this.value, price instanceof Price ? price.value : price) as boolean;
  }

  format(options: PricifyConfig) {
    const formatter = new PriceFormatter(options);
    return formatter.format(this.value);
  }

  valueOf(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return this.value;
  }

  private get validator() {
    return {
      price: (value: number) => {
        if (value < 0) {
          throw new Error("[pricify] Price cannot be negative.");
        }
      },
      substraction: (value1: number, value2: number) => {
        if (value1 - value2 < 0) {
          throw new Error("[pricify] Price cannot be negative after subtraction.");
        }
      },
      percentage: (percentage: number) => {
        if (percentage < 0 || percentage > 100) {
          throw new Error("[pricify] Discount percentage must be between 0 and 100.");
        }
      },
      precision: (precision: number) => {
        if (precision < 0) {
          throw new Error("[pricify] Precision places must be a non-negative number.");
        }
      },
    };
  }
}
