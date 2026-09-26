import { updateMealSchema } from './updateMealSchema';

const ORIGINAL = { quantity: 120, calories: 156, protein: 3, carbohydrate: 34, fat: 0.3 };

describe('updateMealSchema', () => {
  it('should scale the macros by the new quantity of the item', () => {
    const result = updateMealSchema.parse({
      name: ' Almoço ',
      items: [{ name: 'Arroz', unit: 'g', quantity: '180', original: ORIGINAL }]
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
      ]
    });
  });

  it('should accept a decimal quantity written with comma', () => {
    const result = updateMealSchema.parse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: '60,5', original: ORIGINAL }]
    });

    expect(result.items[0]?.quantity).toBe(60.5);
  });

  it('should refuse an invalid or zero quantity', () => {
    const invalid = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: 'muito', original: ORIGINAL }]
    });
    const zero = updateMealSchema.safeParse({
      name: 'Almoço',
      items: [{ name: 'Arroz', unit: 'g', quantity: '0', original: ORIGINAL }]
    });

    expect(invalid.error?.issues[0]?.message).toBe('Informe uma quantidade válida');
    expect(zero.error?.issues[0]?.message).toBe('A quantidade precisa ser maior que zero');
  });

  it('should refuse a meal without items', () => {
    const result = updateMealSchema.safeParse({ name: 'Almoço', items: [] });

    expect(result.error?.issues[0]?.message).toBe('Mantenha pelo menos um item na refeição');
  });
});
