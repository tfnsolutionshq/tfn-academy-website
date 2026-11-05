export function formatNaira(amount: number): string {
  return `NGN ${amount.toLocaleString('en-NG')}`;
}

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
