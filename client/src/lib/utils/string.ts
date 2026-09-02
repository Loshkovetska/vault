import { MerchantInfo } from '../types/transaction';

export function accountFormate(account: string) {
  return `****${account?.slice(12, 16) ?? ''}`;
}

export function prettifyAccount(account: string) {
  return `**** **** **** ${account?.slice(12, 16) ?? ''}`;
}

export function phoneFormate(phone?: string) {
  if (!phone) return '';
  return String(phone).replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
}

export function encryptCardNumber(card: string) {
  return `**** **** **** ${card.slice(12, 16)}`;
}

export function prettifyCardNumber(card: string) {
  let output = [];
  for (let i = 0; i < card.length; i += 4) {
    output.push(card.slice(i, 4 + i));
  }
  return output.join(' ');
}

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
  const prefix = '880001'; // Your custom internal issuer prefix (6 digits)

  // Generate 9 random digits for the account number portion
  let accountNumber = '';
  for (let i = 0; i < 9; i++) {
    accountNumber += Math.floor(Math.random() * 10);
  }

  const absoluteFifteen = prefix + accountNumber;
  const checkDigit = calculateLuhnCheckDigit(absoluteFifteen);

  return absoluteFifteen + checkDigit;
}

export function decodePaymentQR(qrString: string) {
  const result: MerchantInfo = {
    rawFields: {},
    merchantName: '',
    amount: 0,
    currencyCode: '',
    city: '',
    categoryCode: '',
    categoryName: '',
  };

  let index = 0;

  while (index < qrString.length) {
    const tag = qrString.substring(index, index + 2);
    index += 2;
    const lengthStr = qrString.substring(index, index + 2);
    index += 2;

    const length = parseInt(lengthStr, 10);
    if (isNaN(length)) break; // Safety check for malformed strings

    // 3. Extract the value based on the calculated length
    const value = qrString.substring(index, index + length);
    index += length;

    result.rawFields[tag] = value;
  }

  // 4. Map the standard financial tags to readable UI properties
  result.merchantName = result.rawFields['59'] || 'Unknown Merchant';
  result.amount = result.rawFields['54']
    ? parseFloat(result.rawFields['54'])
    : 0;
  result.currencyCode = result.rawFields['53'] || null;
  result.city = result.rawFields['60'] || null;
  result.categoryCode = result.rawFields['52'] || null;

  // 5. Convert ISO Merchant Category Code to a human-readable string
  result.categoryName = getCategoryLabel(result.categoryCode);

  return result;
}

// Helper to translate ISO 18245 Category codes into UI text
function getCategoryLabel(code: string | null) {
  const mapping = {
    '5812': 'Restaurant / Dining',
    '5814': 'Fast Food',
    '5411': 'Grocery Store / Supermarket',
    '5541': 'Gas Station',
    '4111': 'Transportation / Subway',
  };
  return mapping[code as '5812'] || `Other Retail (${code || 'Unknown'})`;
}

export function generateReference(prefix = 'TRX'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}
