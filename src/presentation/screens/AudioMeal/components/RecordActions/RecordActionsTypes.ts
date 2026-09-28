export interface IRecordActionsProps {
  isRecording: boolean;
  isStartingRecording: boolean;
  isDisabled: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}
