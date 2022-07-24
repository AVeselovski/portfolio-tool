/**
 * Returns currency formatted amounts.
 */
export function formatCurrency(amount: number, currency: string = "EUR") {
  switch (currency) {
    default:
      return `${amount.toFixed(2).toString().replace(".", ",")}€`;
  }
}

/**
 * Returns formatted percentage with overflows: `75%`, `+15%`.
 */
export function formatPercentage(percentage: number) {
  return percentage > 100
    ? `+${(percentage - 100).toFixed(1).replace(".", ",")}%`
    : percentage.toFixed(1).replace(".", ",") + "%";
}
