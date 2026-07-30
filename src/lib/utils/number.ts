export function priceFormate(v: number, fractions = 2) {
  return `$${v.toLocaleString('en', {
    minimumFractionDigits: fractions,
    maximumFractionDigits: fractions,
    currency: 'USD',
  })}`;
}

export function percentageFormate(v: number) {
  return `${v * 100}%`;
}
