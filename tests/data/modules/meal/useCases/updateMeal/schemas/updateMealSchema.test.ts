import { updateMealSchema } from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';

const SCHEDULE = { date: '20/09/2026', time: '12:30' };

const ORIGINAL = { quantity: 120, calories: 156, protein: 3, carbohydrate: 34, fat: 0.3 };

describe('updateMealSchema', () => {
  it('should scale the macros by the new quantity of the item', () => {
    const result = updateMealSchema.parse({
      name: ' Almoço ',
      items: [{ name: 'Arroz', unit: 'g', quantity: '180', original: ORIGINAL }],
      ...SCHEDULE
    });

    expect(result).toEqual({
      name: 'Almoço',
      items: [
        {
          name: 'Arroz',
          unit: 'g',
          quantity: 180,
          calories: 234,
          protein: 4.5,
          carbohydrate: 51,
          fat: 0.5
        }
      ],
      date: '2026-09-20',
      time: '12:30'
    });
  });

  it('should accept a decimal quantity written with comma', () => {
    const result = updateMealSchema.parse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: '60,5', original: ORIGINAL }],
      ...SCHEDULE
    });

    expect(result.items[0]?.quantity).toBe(60.5);
  });

  it('should refuse an invalid or zero quantity', () => {
    const invalid = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: 'muito', original: ORIGINAL }],
      ...SCHEDULE
    });
    const zero = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: '0', original: ORIGINAL }],
      ...SCHEDULE
    });

    expect(invalid.error?.issues[0]?.message).toBe('Informe uma quantidade válida');
    expect(zero.error?.issues[0]?.message).toBe('A quantidade precisa ser maior que zero');
  });

  it('should refuse a meal without items', () => {
    const result = updateMealSchema.safeParse({ name: 'Almoço', items: [], ...SCHEDULE });

    expect(result.error?.issues[0]?.message).toBe('Mantenha pelo menos um item na refeição');
  });

  it('should refuse a date or time in the future', () => {
    jest.useFakeTimers({ now: new Date(2026, 8, 26, 10, 0) });

    const item = { name: 'Arroz', unit: 'g', quantity: '120', original: ORIGINAL };
    const futureDate = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [item],
      date: '27/09/2026',
      time: '08:00'
    });
    const futureTime = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [item],
      date: '26/09/2026',
      time: '10:30'
    });

    jest.useRealTimers();

    expect(futureDate.error?.issues[0]?.message).toBe('A data não pode estar no futuro');
    expect(futureTime.error?.issues[0]?.message).toBe('O horário não pode estar no futuro');
  });
});
