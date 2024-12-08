import { PricifyConfig } from "../types";

export class Pricify {
  public static location: PricifyConfig["location"];
  public static trailingZeroDisplay: PricifyConfig["trailingZeroDisplay"];
  public static template: PricifyConfig["template"];
  public static overridedSymbols: PricifyConfig["overridedSymbols"];

  static configure({ location, template, trailingZeroDisplay, overridedSymbols }: PricifyConfig) {
    if (typeof location !== "undefined") Pricify.location = location;
    if (typeof template !== "undefined") Pricify.template = template;
    if (typeof trailingZeroDisplay !== "undefined") Pricify.trailingZeroDisplay = trailingZeroDisplay;
    if (typeof overridedSymbols !== "undefined") Pricify.overridedSymbols = overridedSymbols;
  }
}
