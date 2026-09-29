import type { Language } from 'shared/constants/language';

export function toDecimalInput(value: number, language: Language) {
  return language === 'pt-BR' ? String(value).replace('.', ',') : String(value);
}
