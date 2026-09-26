export interface ICaptureActionsProps {
  isCaptureDisabled: boolean;
  isCapturing: boolean;
  isPicking: boolean;
  onCapture: () => void;
  onPickFromGallery: () => void;
}
