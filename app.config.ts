import type { ExpoConfig } from 'expo/config';

const BRAND_BACKGROUND = '#022C22';

const CAMERA_PERMISSION =
  'Nutrail uses the camera to take pictures of your meals and calculate the macros.';
const MICROPHONE_PERMISSION =
  'Nutrail uses the microphone to record the description of your meals and calculate the macros.';

const config: ExpoConfig = {
  name: 'Nutrail',
  slug: 'nutrail',
  scheme: 'nutrail',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    bundleIdentifier: 'com.nutrail.app',
    supportsTablet: false,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true
    }
  },
  android: {
    package: 'com.nutrail.app',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      monochromeImage: './assets/monochrome-icon.png',
      backgroundColor: BRAND_BACKGROUND
    },
    blockedPermissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.VIBRATE'
    ],
    predictiveBackGestureEnabled: false
  },
  locales: {
    pt: './locales/pt.json',
    en: './locales/en.json'
  },
  experiments: {
    tsconfigPaths: true
  },
  plugins: [
    'expo-font',
    'expo-status-bar',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        backgroundColor: BRAND_BACKGROUND
      }
    ],
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
