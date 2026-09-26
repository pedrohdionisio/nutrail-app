import type { CameraView } from 'expo-camera';
import type { RefObject } from 'react';
import type { CameraStatus } from '../../PictureMealTypes';

export interface IPictureFrameProps {
  cameraRef: RefObject<CameraView | null>;
  cameraStatus: CameraStatus;
  canAskPermission: boolean;
  pictureUri: string | null;
  onCameraReady: () => void;
  onRequestPermission: () => void;
}
