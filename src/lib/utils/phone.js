export function validateMalaysianPhone(phone) {
  if (!phone) return { valid: false, error: 'Phone number is required' };

  // Remove all non-digit characters (strips +, spaces, dashes etc.)
  const cleanPhone = phone.replace(/\D/g, '');

  // ── Malaysian number ─────────────────────────────────────────────────────
  // Accepted input formats (all normalised to 601xxxxxxxx):
  //   • 01xxxxxxxx   (10 digits)   — user typed local format
  //   • 011xxxxxxxx  (11 digits)   — user typed local format (011 prefix)
  //   • 601xxxxxxxx  (11 digits)   — dial code stripped of +
  //   • 6011xxxxxxxx (12 digits)   — 011 with dial code
  if (
    /^01\d{8,9}$/.test(cleanPhone) ||       // local: 01x-xxxxxxxx
    /^601\d{8,9}$/.test(cleanPhone)         // intl:  +60 + 01x...
  ) {
    // Normalise to 601xxxxxxxx
    const formatted = cleanPhone.startsWith('60')
      ? cleanPhone
      : cleanPhone.replace(/^0/, '60');
    return { valid: true, formatted };
  }

  // ── Non-MY dial code numbers (SG +65, BN +673, ID +62) ─────────────────
  // Form already prepends the correct country code, so any number starting
  // with 65, 673 or 62 is considered valid as-is (basic length check only).
  if (
    /^65\d{7,10}$/.test(cleanPhone)  ||   // Singapore
    /^673\d{6,9}$/.test(cleanPhone)  ||   // Brunei
    /^62\d{8,12}$/.test(cleanPhone)       // Indonesia
  ) {
    return { valid: true, formatted: cleanPhone };
  }

  return { valid: false, error: 'Invalid phone number format. Malaysia: 01X-XXXXXXX' };
}

export function formatPhoneForWhatsApp(phone) {
  const { valid, formatted } = validateMalaysianPhone(phone);
  if (!valid) return null;

  // Already in international format (starts with country code digit)
  if (formatted.startsWith('60') || formatted.startsWith('65') || formatted.startsWith('62') || formatted.startsWith('673')) {
    return formatted;
  }

  // Fallback: strip leading 0, prepend 60
  return formatted.replace(/^0/, '60');
}

export function formatPhoneForDisplay(phone) {
  const { valid, formatted } = validateMalaysianPhone(phone);
  if (!valid) return phone; // Fallback to original

  // MY number: 601xxxxxxxx → 01X-XXX XXXX
  const local = formatted.startsWith('60') ? formatted.replace(/^60/, '0') : formatted;

  // Format as 01X-XXX XXXX or 011-XXXX XXXX
  if (local.startsWith('011')) {
    return `${local.slice(0, 3)}-${local.slice(3, 7)} ${local.slice(7)}`;
  }
  return `${local.slice(0, 3)}-${local.slice(3, 6)} ${local.slice(6)}`;
}
