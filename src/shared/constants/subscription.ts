export const PLANS = ['FREE', 'PREMIUM'] as const;
export type Plan = (typeof PLANS)[number];
