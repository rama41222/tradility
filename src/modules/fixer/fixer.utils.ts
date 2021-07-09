const converter = (
  fromCurrencyRate: number,
  toCurrencyRate: number,
): number => {
  return fromCurrencyRate / toCurrencyRate;
};

export { converter };
