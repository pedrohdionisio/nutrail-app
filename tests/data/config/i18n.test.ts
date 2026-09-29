import * as SecureStore from 'expo-secure-store';

function loadI18n(deviceLanguageCode: string) {
  let module: typeof import('data/config/i18n') | undefined;

  jest.isolateModules(() => {
    const localization: typeof import('expo-localization') = require('expo-localization');
    jest
      .spyOn(localization, 'getLocales')
      .mockReturnValue([{ ...localization.getLocales()[0], languageCode: deviceLanguageCode }]);
    module = require('data/config/i18n');
  });

  return module;
}

describe('i18n', () => {
  it('should start in Portuguese on a Portuguese device', () => {
    expect(loadI18n('pt')?.getLanguage()).toBe('pt-BR');
  });

  it('should start in English on a device in any other language', () => {
    expect(loadI18n('fr')?.getLanguage()).toBe('en-US');
  });

  it('should prefer the language the user chose over the device language', async () => {
    await SecureStore.setItemAsync('nutrail.settings.language', 'en-US');

    expect(loadI18n('pt')?.getLanguage()).toBe('en-US');
  });
});
