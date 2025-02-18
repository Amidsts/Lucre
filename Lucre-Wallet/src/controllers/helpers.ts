export function generateAccountNumber() {
  return Math.floor(Math.random() * 10000000000).toString();
}
