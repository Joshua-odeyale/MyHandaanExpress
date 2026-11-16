const numberFormatter = new Intl.NumberFormat('en-NG');

/** 5000 -> "₦5,000" */
export const formatNaira = (amount) => `₦${numberFormatter.format(amount)}`;

export const firstName = (fullName = '') => fullName.trim().split(/\s+/)[0] ?? '';
