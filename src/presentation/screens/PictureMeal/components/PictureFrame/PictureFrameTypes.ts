import type { CameraView } from 'expo-camera';
import type { RefObject } from 'react';
import type { DevicePermissionStatus } from 'shared/constants/devicePermission';

export interface IPictureFrameProps {
  cameraRef: RefObject<CameraView | null>;
  cameraStatus: DevicePermissionStatus;
  canAskPermission: boolean;
  pictureUri: string | null;
  onCameraReady: () => void;
  onRequestPermission: () => void;
}
