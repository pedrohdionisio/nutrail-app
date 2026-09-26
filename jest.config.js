process.env.TZ = 'America/Sao_Paulo';

const TRANSFORMED_PACKAGES = [
  'react-native',
  '@react-native',
  '@react-native-community',
  'expo',
  '@expo',
  '@expo-google-fonts',
  'react-navigation',
  '@react-navigation',
  'nativewind',
  '@gorhom',
  'msw',
  '@mswjs',
  'rettime',
  'until-async',
  '@open-draft'
];

const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/tests/env.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transform: {
    '\\.mjs$': expoPreset.transform['\\.[jt]sx?$']
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/*Types.ts'],
  transformIgnorePatterns: [
    `/node_modules/(?!(${TRANSFORMED_PACKAGES.join('|')}))`,
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/'
  ]
};
