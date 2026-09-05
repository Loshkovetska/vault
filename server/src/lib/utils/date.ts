export function generateExpiryDate(yearsToLive = 4) {
  const now = new Date();

  // Set the expiration date exactly N years into the future
  const expiryDate = new Date(now.setFullYear(now.getFullYear() + yearsToLive));

  return expiryDate.toISOString();
}
