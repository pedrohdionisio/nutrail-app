jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));
jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default
);

afterEach(() => {
  jest.restoreAllMocks();
});
