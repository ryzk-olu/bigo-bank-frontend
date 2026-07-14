import type { Currency } from "./account";

export interface ExchangeRate {
  currency: Currency;
  rate: number;
}
