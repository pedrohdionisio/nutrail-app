import type { PermissionResponse } from 'expo';
import type { DevicePermissionStatus } from 'shared/constants/devicePermission';

export function toDevicePermissionStatus(
  permission: PermissionResponse | null
): DevicePermissionStatus {
  if (!permission || permission.status === 'undetermined') {
    return 'LOADING';
  }

  return permission.granted ? 'GRANTED' : 'DENIED';
}
