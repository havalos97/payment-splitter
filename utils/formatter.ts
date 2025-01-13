export const formater = (amount: number) => Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(amount);
