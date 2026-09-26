import type { IMealItem } from 'shared/entities/IMealItem';
import { formatMealItem } from './formatMealItem';

function buildItem(overrides: Partial<IMealItem>): IMealItem {
  return {
    name: 'Arroz',
    quantity: 120,
    unit: 'g',
    calories: 156,
    protein: 3,
    carbohydrate: 34,
    fat: 0.3,
    ...overrides
  };
}

describe('formatMealItem', () => {
  it('should attach grams and milliliters to the quantity', () => {
    expect(formatMealItem(buildItem({}))).toBe('120g Arroz');
    expect(formatMealItem(buildItem({ name: 'Suco de laranja', quantity: 200, unit: 'ml' }))).toBe(
      '200ml Suco de laranja'
    );
  });

  it('should separate countable units from the quantity', () => {
    expect(formatMealItem(buildItem({ name: 'Ovo', quantity: 2, unit: 'unidades' }))).toBe(
      '2 unidades Ovo'
    );
  });
});
