import { updateGoalsSchema } from './updateGoalsSchema';

const VALID = { calories: ' 2200 ', carbohydrate: '200', protein: '175', fat: '0' };

describe('updateGoalsSchema', () => {
  it('should convert the fields into integers', () => {
    expect(updateGoalsSchema.parse(VALID)).toEqual({
      calories: 2200,
      carbohydrate: 200,
      protein: 175,
      fat: 0
    });
  });

  it('should refuse decimals and text', () => {
    const result = updateGoalsSchema.safeParse({ ...VALID, protein: '17,5', fat: 'abc' });

    expect(result.error?.issues.map(({ path, message }) => ({ path, message }))).toEqual([
      { path: ['protein'], message: 'Informe um número inteiro' },
      { path: ['fat'], message: 'Informe um número inteiro' }
    ]);
  });

  it('should require calories above zero', () => {
    const result = updateGoalsSchema.safeParse({ ...VALID, calories: '0' });

    expect(result.error?.issues[0]?.message).toBe('A meta de calorias precisa ser maior que zero');
  });
});
