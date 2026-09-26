import type { PermissionResponse } from 'expo-camera';
import type { CameraStatus } from '../PictureMealTypes';

export function toCameraStatus(permission: PermissionResponse | null): CameraStatus {
  if (!permission || permission.status === 'undetermined') {
    return 'LOADING';
  }

  return permission.granted ? 'GRANTED' : 'DENIED';
}
