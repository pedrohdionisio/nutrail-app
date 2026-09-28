export const DEVICE_PERMISSION_STATUSES = ['LOADING', 'GRANTED', 'DENIED'] as const;
export type DevicePermissionStatus = (typeof DEVICE_PERMISSION_STATUSES)[number];
