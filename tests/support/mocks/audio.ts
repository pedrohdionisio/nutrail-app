import { PermissionStatus } from 'expo';
import type { PermissionResponse } from 'expo-audio';
import { useSyncExternalStore } from 'react';

interface IRecorderState {
  isRecording: boolean;
  durationMillis: number;
}

const GRANTED_PERMISSION: PermissionResponse = {
  status: PermissionStatus.GRANTED,
  granted: true,
  canAskAgain: true,
  expires: 'never'
};

const IDLE_STATE: IRecorderState = { isRecording: false, durationMillis: 0 };

export const RECORDED_DURATION_MILLIS = 7400;

const listeners = new Set<() => void>();
let recorderState = IDLE_STATE;

export const microphonePermission = { current: GRANTED_PERMISSION };

function updateRecorderState(next: IRecorderState) {
  recorderState = next;

  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

const recorder = {
  uri: null as string | null,
  prepareToRecordAsync: async () => undefined,
  record: () => {
    updateRecorderState({ isRecording: true, durationMillis: RECORDED_DURATION_MILLIS });
  },
  stop: async () => {
    recorder.uri = 'file:///meal.m4a';
    updateRecorderState(IDLE_STATE);
  }
};

export const audioPlayer = {
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(async () => undefined)
};

export const audioMock = {
  RecordingPresets: { HIGH_QUALITY: {} },
  getRecordingPermissionsAsync: async () => microphonePermission.current,
  requestRecordingPermissionsAsync: async () => microphonePermission.current,
  setAudioModeAsync: async () => undefined,
  useAudioRecorder: () => recorder,
  useAudioRecorderState: () => useSyncExternalStore(subscribe, () => recorderState),
  useAudioPlayer: () => audioPlayer,
  useAudioPlayerStatus: () => ({ playing: false, currentTime: 0, duration: 0 })
};

export function resetAudio() {
  microphonePermission.current = GRANTED_PERMISSION;
  recorder.uri = null;
  recorderState = IDLE_STATE;
}
