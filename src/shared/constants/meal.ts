export const MEAL_INPUT_TYPES = ['PICTURE', 'AUDIO', 'MANUAL'] as const;
export type MealInputType = (typeof MEAL_INPUT_TYPES)[number];

export const MEAL_STATUSES = ['UPLOADING', 'QUEUED', 'PROCESSING', 'SUCCESS', 'FAILED'] as const;
export type MealStatus = (typeof MEAL_STATUSES)[number];
