export function maskTime(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  return [digits.slice(0, 2), digits.slice(2, 4)].filter(Boolean).join(':');
}
