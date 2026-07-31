import crypto from 'crypto';

export function hashSHA256(value) {
  if (!value) return null;
  // Meta requires lowercase string for hashing
  const normalizedValue = value.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalizedValue).digest('hex');
}

export function hashUserData(userData) {
  const hashedData = {};
  
  if (userData.email) {
    hashedData.em = hashSHA256(userData.email);
  }
  
  if (userData.phone) {
    // Phone must be numbers only, with country code
    let phoneStr = userData.phone.replace(/\D/g, '');
    if (phoneStr.startsWith('0')) {
      phoneStr = '60' + phoneStr.substring(1);
    }
    hashedData.ph = hashSHA256(phoneStr);
  }
  
  return hashedData;
}
