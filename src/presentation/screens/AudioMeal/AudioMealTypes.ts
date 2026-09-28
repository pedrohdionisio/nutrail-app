export type RecordingStep = 'IDLE' | 'RECORDING' | 'RECORDED';

export interface IRecording {
  uri: string;
  durationMillis: number;
}
