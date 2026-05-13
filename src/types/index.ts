export interface CurrencyRate {
  buy: number;
  sell: number;
}

export interface Rates {
  USD: CurrencyRate;
  EUR: CurrencyRate;
  RUB: CurrencyRate;
}

export type CurrencyCode = keyof Rates;

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export interface StoredData {
  rates: Rates;
  updatedAt: string | null; // ISO 8601, null = hali admin tomonidan o'zgartirilmagan
}
