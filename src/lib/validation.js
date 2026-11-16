const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Nigerian mobile numbers: 0803 123 4567 or +234 803 123 4567
const NG_PHONE_PATTERN = /^(?:\+?234|0)[789][01]\d{8}$/;

export const MIN_PASSWORD_LENGTH = 6;

export function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'Email is required';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address';
  return '';
}

export function validatePassword(value) {
  if (!value) return 'Password is required';
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return '';
}

export function validateName(value) {
  if (value.trim().length < 2) return 'Enter your full name';
  return '';
}

export function validatePhone(value) {
  const phone = value.replace(/[\s()-]/g, '');
  if (!phone) return 'Phone number is required';
  if (!NG_PHONE_PATTERN.test(phone)) {
    return 'Enter a valid Nigerian phone number, e.g. 0803 123 4567';
  }
  return '';
}

export function validateAddress(value) {
  if (value.trim().length < 10) return 'Enter your full delivery address';
  return '';
}

/** True when every value in an errors object is empty. */
export const isValid = (errors) => Object.values(errors).every((error) => !error);
