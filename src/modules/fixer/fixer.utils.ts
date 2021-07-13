/**
 * Converts one currency to another
 * @param  {number} fromCurrencyRate
 * @param  {number} toCurrencyRate
 * @returns {number} converted value
 */
const converter = (
  fromCurrencyRate: number,
  toCurrencyRate: number,
): number => {
  return fromCurrencyRate / toCurrencyRate;
};

export { converter };
