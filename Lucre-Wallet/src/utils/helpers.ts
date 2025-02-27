import crypto from 'crypto';

export function generateAccountNumber() {
  return Math.floor(
    Math.random() * (9999999999 - 1000000000) + 1000000000,
  ).toString();
}
