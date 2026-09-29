import * as SecureStore from 'expo-secure-store';
import { LANGUAGES, type Language } from 'shared/constants/language';
import { LANGUAGE_STORAGE_KEY } from 'shared/constants/storageKeys';

function load(): Language | null {
  const stored = SecureStore.getItem(LANGUAGE_STORAGE_KEY);

  return LANGUAGES.find((language) => language === stored) ?? null;
}

async function save(language: Language) {
  await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, language);
}

export const LanguageManager = {
  load,
  save
};
