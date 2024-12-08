import { COUNTRIES, LOG_PREFIX } from "../constants";
import { PriceParts, PricifyConfig, TemplatePart, FormattedPrice } from "../types";
import { Price } from "./Price";
import { Pricify } from "./Pricify";

export class PriceFormatter {
  private _location?: PricifyConfig["location"];
  private _template?: PricifyConfig["template"];
  private _trailingZeroDisplay?: PricifyConfig["trailingZeroDisplay"];
  private _overridedSymbols?: PricifyConfig["overridedSymbols"];

  constructor(options?: PricifyConfig) {
    this._template = options?.template;
    this._location = options?.location;
    this._trailingZeroDisplay = options?.trailingZeroDisplay;
    this._overridedSymbols = options?.overridedSymbols;
  }

  static create(options: PricifyConfig) {
    return new PriceFormatter(options);
  }

  get template() {
    const template = this._template || Pricify.template;

    if (typeof template === "undefined") return undefined;
    if (typeof template === "string") return template;
    return template[this.location];
  }

  get location() {
    const location = this._location || Pricify.location;

    if (typeof location === "undefined") {
      throw new Error(
        `${LOG_PREFIX} Unable to determine location. Please set it using \`Pricify.configure\`, the \`PriceFormatter\` constructor, or the \`Price.format\` method's prop.`
      );
    }

    return location;
  }

  get trailingZeroDisplay() {
    const trailingZeroDisplay = this._trailingZeroDisplay || Pricify.trailingZeroDisplay;
    if (typeof trailingZeroDisplay === "undefined") return undefined;
    if (typeof trailingZeroDisplay === "boolean") return trailingZeroDisplay;
    return trailingZeroDisplay[this.location];
  }

  get overridedSymbols() {
    const overridedSymbols = this._overridedSymbols || Pricify.overridedSymbols;
    if (typeof overridedSymbols === "undefined") return {};
    if (typeof overridedSymbols === "string") return { [this.location]: overridedSymbols };
    return overridedSymbols;
  }

  public get currency() {
    const overridedCurrency = this.overridedSymbols[this.location];
    const priceParts = this.parsePriceParts(0);
    const currency = priceParts.find((p) => p.type === "currency")!.value;
    return overridedCurrency || currency;
  }

  public get countryCode(): string {
    const splitted = this.location.split("-");
    if (splitted.length === 1) return this.location;
    return splitted[1];
  }

  public get currencyCode(): string {
    return COUNTRIES.find((c) => c.countryCode === this.countryCode)!.currencyCode;
  }

  public format(price: number): string;
  public format(price: Price): string;
  public format(price: number | Price): string {
    const priceObj = price instanceof Price ? price : new Price(price);
    return this.formatPrice(priceObj).formattedPrice;
  }

  public formatToParts(price: number): PriceParts;
  public formatToParts(price: Price): PriceParts;
  public formatToParts(price: number | Price): PriceParts {
    const priceObj = price instanceof Price ? price : new Price(price);
    const { currency, formattedPrice } = this.formatPrice(priceObj);
    return {
      value: priceObj.value,
      currency,
      formatted: formattedPrice.replace(this.currency, "").trim(),
      display: formattedPrice,
    };
  }

  private formatPrice(price: Price): FormattedPrice {
    const priceParts = this.parsePriceParts(price.value);
    const currencyPart = priceParts.find((p) => p.type === "currency");
    if (currencyPart) currencyPart.value = this.currency;

    let compiledTemplate: string;

    if (this.template) {
      const templateParts = this.parseTemplate(this.template);
      this.applyFractionRound(templateParts, price);
      const updatedPriceParts = this.parsePriceParts(price.value);
      const updatedCurrencyPart = updatedPriceParts.find((p) => p.type === "currency");
      if (updatedCurrencyPart) updatedCurrencyPart.value = this.currency;
      compiledTemplate = this.compileTemplate(templateParts, updatedPriceParts);
    } else {
      compiledTemplate = this.formatWithoutTemplate(priceParts);
    }

    return { currency: this.currency, formattedPrice: compiledTemplate };
  }

  private parsePriceParts(price: number): Intl.NumberFormatPart[] {
    const formatter = new Intl.NumberFormat(this.location, {
      style: "currency",
      currency: this.currencyCode,
      currencyDisplay: "symbol",
      maximumFractionDigits: 15,
      ...{ trailingZeroDisplay: this.trailingZeroDisplay ? "stripIfInteger" : "auto" },
    });

    return formatter.formatToParts(price);
  }

  private applyFractionRound(templateParts: TemplatePart[], price: Price): void {
    const fractionPart = templateParts.find((p) => p.type === "fraction");
    if (fractionPart) price.round(fractionPart.precision);
  }

  private formatWithoutTemplate(priceParts: Intl.NumberFormatPart[]): string {
    return priceParts.reduce((acc, curr) => acc + curr.value, "");
  }

  private compileTemplate(templateParts: TemplatePart[], priceParts: Intl.NumberFormatPart[]) {
    const fractionPart = priceParts.find((p) => p.type === "fraction");
    const currencyPart = priceParts.find((p) => p.type === "currency");
    const integerParts = priceParts.filter((part) => part.type === "integer");

    let compiledTemplate = "";

    templateParts.forEach((p) => {
      if (p.type === "thousand") {
        compiledTemplate += integerParts.map((p) => p.value).join(p.delimiter);
      }

      if (p.type === "fraction" && fractionPart?.value) {
        compiledTemplate += `${p.delimiter}${fractionPart.value.padEnd(
          this.trailingZeroDisplay ? 0 : p.precision,
          "0"
        )}`;
      }

      if (p.type === "currency") {
        compiledTemplate += currencyPart?.value;
      }

      if (p.type === "other") {
        compiledTemplate += p.value;
      }
    });

    return compiledTemplate;
  }

  private parseTemplate(template: string): TemplatePart[] {
    const regex = /\{thousand\|(.+?)\}|\{fraction\|(\d+)\|(.+?)\}|{currency}|(.+?)/g;
    const matches = template.matchAll(regex);

    return Array.from(matches).map((m) => {
      if (m[0].startsWith("{thousand|")) return { type: "thousand", delimiter: m[1] };
      if (m[0].startsWith("{fraction|")) return { type: "fraction", precision: Number(m[2]), delimiter: m[3] };
      if (m[0] === "{currency}") return { type: "currency" };
      return { type: "other", value: m[4] };
    });
  }
}
