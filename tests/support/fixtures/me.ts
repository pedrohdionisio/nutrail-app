import type { IMe } from 'shared/entities/IMe';

export function buildMe(overrides: Partial<IMe['profile']> = {}): IMe {
  return {
    profile: {
      name: 'Ana Souza',
      email: 'ana@nutrail.test',
      gender: 'FEMALE',
      birthDate: '1990-03-07',
      height: 165,
      weight: 62.5,
      goal: 'LOSE',
      activityLevel: 'LIGHT',
      ...overrides
    },
    goals: { calories: 2000, protein: 175, carbohydrate: 200, fat: 56 }
  };
}
