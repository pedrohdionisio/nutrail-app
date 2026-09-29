import type { Language } from 'shared/constants/language';

export function parseDateInput(value: string, language: Language): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, first, second, year] = match;
  const [month, day] = language === 'en-US' ? [first, second] : [second, first];
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return `${year}-${month}-${day}`;
}
