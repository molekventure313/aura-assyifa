export function validateMalaysianPhone(phone) {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  
  // Remove non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Basic length check for Malaysian numbers (starts with 01, typically 10-11 digits)
  // E.g., 0123456789 (10) or 01123456789 (11)
  if (!/^01\d{8,9}$/.test(cleanPhone)) {
    return { valid: false, error: 'Invalid Malaysian phone number format' };
  }
  
  return { valid: true, formatted: cleanPhone };
}

export function formatPhoneForWhatsApp(phone) {
  const { valid, formatted } = validateMalaysianPhone(phone);
  if (!valid) return null;
  
  // Replace leading '0' with '60'
  return formatted.replace(/^0/, '60');
}

export function formatPhoneForDisplay(phone) {
  const { valid, formatted } = validateMalaysianPhone(phone);
  if (!valid) return phone; // Fallback to original
  
  // Format as 01X-XXX XXXX or 011-XXXX XXXX
  if (formatted.startsWith('011')) {
    return `${formatted.slice(0, 3)}-${formatted.slice(3, 7)} ${formatted.slice(7)}`;
  }
  return `${formatted.slice(0, 3)}-${formatted.slice(3, 6)} ${formatted.slice(6)}`;
}
