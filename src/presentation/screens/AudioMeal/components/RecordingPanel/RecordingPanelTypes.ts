import type { DevicePermissionStatus } from 'shared/constants/devicePermission';
import type { RecordingStep } from '../../AudioMealTypes';

export interface IRecordingPanelProps {
  microphoneStatus: DevicePermissionStatus;
  canAskPermission: boolean;
  recordingStep: RecordingStep;
  durationLabel: string;
  isPlaying: boolean;
  onRequestPermission: () => void;
  onTogglePlayback: () => void;
}
