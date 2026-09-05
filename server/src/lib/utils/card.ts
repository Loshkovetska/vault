function calculateLuhnCheckDigit(numberStr: string) {
  let sum = 0;
  let shouldDouble = true; // Start with the digit right before the check digit (moving backward)

  for (let i = numberStr.length - 1; i >= 0; i--) {
    let digit = parseInt(numberStr.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (10 - (sum % 10)) % 10;
}
export function generateInternalCardNumber() {
  const prefix = "880001"; // Your custom internal issuer prefix (6 digits)

  // Generate 9 random digits for the account number portion
  let accountNumber = "";
  for (let i = 0; i < 9; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }

  const absoluteFifteen = prefix + accountNumber;
  const checkDigit = calculateLuhnCheckDigit(absoluteFifteen);

  return absoluteFifteen + checkDigit;
}
