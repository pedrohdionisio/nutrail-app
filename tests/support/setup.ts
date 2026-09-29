import 'react-native-gesture-handler/jestSetup';
import { removeAccessToken, removeSessionHandlers } from 'data/config/api';
import { i18n } from 'data/config/i18n';
import { resetAudio } from './mocks/audio';
import { clearSecureStore } from './mocks/secureStore';
import { server } from './server';

jest.mock('expo-secure-store', () => jest.requireActual('./mocks/secureStore').secureStoreMock);
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'pt', languageTag: 'pt-BR' }]
}));
jest.mock('expo-audio', () => jest.requireActual('./mocks/audio').audioMock);
jest.mock(
  '@react-native-community/datetimepicker',
  () => jest.requireActual('./mocks/dateTimePicker').dateTimePickerMock
);
jest.mock('@gorhom/bottom-sheet', () => jest.requireActual('./mocks/bottomSheet').bottomSheetMock);
jest.mock(
  'react-native-gesture-handler/ReanimatedSwipeable',
  () => jest.requireActual('./mocks/swipeable').swipeableMock
);
jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));
jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(async () => {
  if (i18n.language !== 'pt-BR') {
    await i18n.changeLanguage('pt-BR');
  }

  jest.restoreAllMocks();
  server.resetHandlers();
  removeAccessToken();
  removeSessionHandlers();
  clearSecureStore();
  resetAudio();
});

afterAll(() => server.close());
