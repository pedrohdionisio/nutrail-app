import 'react-native-gesture-handler/jestSetup';
import { removeAccessToken, removeSessionHandlers } from 'data/config/api';
import { resetAudio } from './mocks/audio';
import { clearSecureStore } from './mocks/secureStore';
import { server } from './server';

jest.mock('expo-secure-store', () => jest.requireActual('./mocks/secureStore').secureStoreMock);
jest.mock('expo-audio', () => jest.requireActual('./mocks/audio').audioMock);
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

afterEach(() => {
  jest.restoreAllMocks();
  server.resetHandlers();
  removeAccessToken();
  removeSessionHandlers();
  clearSecureStore();
  resetAudio();
});

afterAll(() => server.close());
