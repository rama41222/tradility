export enum MainCurrency {
  USD = 'USD',
  SGD = 'SGD',
  HKD = 'HKD',
}

export const MainCurrencyConversions = {
  USD: [MainCurrency.SGD, MainCurrency.HKD],
  SGD: [MainCurrency.USD],
  HKD: [MainCurrency.USD],
};

export interface CalculateRate {
  from: MainCurrency;
  to: MainCurrency;
  rate: number;
  timestamp: number;
  date: string;
}

export interface Env {
  port: number;
  api: {
    fixer: string;
  };
  redis: {
    host: string;
    port: number;
  };
}
