export type Amount = {
  currency: string;
  amount: string;
};

export type PriceParts = {
  currency: string;
  value: number;
  formatted: string;
  display: string;
};

export type FormattedPrice = {
  currency: string;
  formattedPrice: string;
};

export type CurrencyTemplatePart = {
  type: "currency";
};

export type OtherTemplatePart = {
  type: "other";
  value: string;
};

export type ThousandTemplatePart = {
  type: "thousand";
  delimiter: string;
};

export type FractionTemplatePart = {
  type: "fraction";
  precision: number;
  delimiter: string;
};

export type TemplatePart = CurrencyTemplatePart | OtherTemplatePart | ThousandTemplatePart | FractionTemplatePart;

export type PricifyConfig = {
  location?: string;
  template?: string | Record<string, string>;
  trailingZeroDisplay?: boolean | Record<string, boolean>;
  overridedSymbols?: string | Record<string, string>;
};
