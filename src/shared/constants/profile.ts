export const GOALS = ['LOSE', 'MAINTAIN', 'GAIN'] as const;
export type Goal = (typeof GOALS)[number];

export const GENDERS = ['MALE', 'FEMALE'] as const;
export type Gender = (typeof GENDERS)[number];

export const ACTIVITY_LEVELS = ['SEDENTARY', 'LIGHT', 'MODERATE', 'HEAVY', 'ATHLETE'] as const;
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];
