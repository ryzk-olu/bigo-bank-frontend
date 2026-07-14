export type Currency =
  | "RSD"
  | "USD"
  | "EUR";

export interface Account {
  id: number;
  currency: Currency;
  balance: number;
}
