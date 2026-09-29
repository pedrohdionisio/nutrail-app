import type { Language } from 'shared/constants/language';

export function toDateInput(isoDate: string, language: Language) {
  const [year, month, day] = isoDate.split('-');

  return language === 'en-US' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
}
