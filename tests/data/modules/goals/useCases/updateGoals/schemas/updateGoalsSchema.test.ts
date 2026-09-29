import { updateGoalsSchema } from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';

const VALID = { calories: ' 2200 ', carbohydrate: '200', protein: '175', fat: '0' };

describe('updateGoalsSchema', () => {
  it('should send only the calories in the calories mode', () => {
    expect(updateGoalsSchema.parse({ ...VALID, mode: 'calories', protein: 'abc' })).toEqual({
      calories: 2200
    });
  });

  it('should send only the macros in the macros mode', () => {
    expect(updateGoalsSchema.parse({ ...VALID, mode: 'macros', calories: '' })).toEqual({
      carbohydrate: 200,
      protein: 175,
      fat: 0
    });
  });

  it('should refuse decimals and text', () => {
    const result = updateGoalsSchema.safeParse({
      ...VALID,
      mode: 'macros',
      protein: '17,5',
      fat: 'abc'
    });

    expect(result.error?.issues.map(({ path, message }) => ({ path, message }))).toEqual([
      { path: ['protein'], message: 'validation.wholeNumber' },
      { path: ['fat'], message: 'validation.wholeNumber' }
    ]);
  });

  it('should require calories above zero', () => {
    const result = updateGoalsSchema.safeParse({ ...VALID, mode: 'calories', calories: '0' });

    expect(result.error?.issues[0]?.message).toBe('validation.caloriesPositive');
  });
});
