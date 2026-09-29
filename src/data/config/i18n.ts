import { LanguageManager } from 'data/libs/LanguageManager';
import { getLocales } from 'expo-localization';
import i18n, { type ParseKeys } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from 'shared/constants/language';
import { enUS } from './locales/enUS';
import { ptBR } from './locales/ptBR';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof ptBR };
  }
}

export type TranslationKey = ParseKeys;

function getDeviceLanguage(): Language {
  return getLocales()[0]?.languageCode === 'pt' ? 'pt-BR' : 'en-US';
}

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS }
  },
  lng: LanguageManager.load() ?? getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES,
  initAsync: false,
  interpolation: { escapeValue: false }
});

export function toLanguage(value: string): Language {
  return LANGUAGES.find((language) => language === value) ?? DEFAULT_LANGUAGE;
}

export function getLanguage(): Language {
  return toLanguage(i18n.language);
}

export async function changeLanguage(language: Language) {
  await LanguageManager.save(language);
  await i18n.changeLanguage(language);
}

export function isTranslationKey(value: string): value is TranslationKey {
  return i18n.exists(value);
}

export { i18n };
