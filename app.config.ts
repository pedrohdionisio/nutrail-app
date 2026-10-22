import type { ExpoConfig } from 'expo/config';

const IS_PRODUCTION = process.env.APP_VARIANT === 'production';

const CAMERA_PERMISSION =
  'Nutrail uses the camera to take pictures of your meals and calculate the macros.';
const MICROPHONE_PERMISSION =
  'Nutrail uses the microphone to record the description of your meals and calculate the macros.';

const config: ExpoConfig = {
  name: IS_PRODUCTION ? 'Nutrail' : 'Nutrail Dev',
  slug: 'nutrail',
  owner: 'pedrohdionisio',
  scheme: IS_PRODUCTION ? 'nutrail' : 'nutrail-dev',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  ios: {
    bundleIdentifier: IS_PRODUCTION ? 'com.nutrail.app' : 'com.nutrail.app.dev',
    supportsTablet: false,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true
    }
  },
  android: {
    package: IS_PRODUCTION ? 'com.nutrail.app' : 'com.nutrail.app.dev',
    predictiveBackGestureEnabled: false
  },
  locales: {
    pt: './locales/pt.json',
    en: './locales/en.json'
  },
  experiments: {
    tsconfigPaths: true
  },
  extra: {
    eas: {
      projectId: '69df0e5d-043e-4ac2-862e-3ded530589d0'
    }
  },
  plugins: [
    'expo-font',
    'expo-splash-screen',
    'expo-secure-store',
    [
      'expo-camera',
      {
        cameraPermission: CAMERA_PERMISSION,
        microphonePermission: MICROPHONE_PERMISSION,
        recordAudioAndroid: false,
        barcodeScannerEnabled: false
      }
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'Nutrail uses your photos to attach the picture of a meal.',
        cameraPermission: false,
        microphonePermission: MICROPHONE_PERMISSION
      }
    ],
    [
      'expo-audio',
      {
        microphonePermission: MICROPHONE_PERMISSION,
        enableBackgroundPlayback: false
      }
    ],
    '@react-native-community/datetimepicker',
    'expo-localization'
  ]
};

export default config;
