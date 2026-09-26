export const MEAL_INPUT_TYPES = ['PICTURE', 'AUDIO', 'MANUAL'] as const;
export type MealInputType = (typeof MEAL_INPUT_TYPES)[number];
