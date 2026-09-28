import {
  getRecordingPermissionsAsync,
  type PermissionResponse,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync
} from 'expo-audio';

export const MEAL_RECORDING_OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  numberOfChannels: 1,
  bitRate: 64000
};

async function getPermission(): Promise<PermissionResponse> {
  const permission = await getRecordingPermissionsAsync();

  if (permission.status === 'undetermined') {
    return requestRecordingPermissionsAsync();
  }

  return permission;
}

async function requestPermission(): Promise<PermissionResponse> {
  return requestRecordingPermissionsAsync();
}

async function enableRecording(): Promise<void> {
  await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
}

async function enablePlayback(): Promise<void> {
  await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
}

export const MealAudioManager = {
  getPermission,
  requestPermission,
  enableRecording,
  enablePlayback
};
