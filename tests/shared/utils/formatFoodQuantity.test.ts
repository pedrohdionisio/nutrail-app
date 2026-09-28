import { formatFoodQuantity } from 'shared/utils/formatFoodQuantity';

describe('formatFoodQuantity', () => {
  it('should attach grams and milliliters to the quantity', () => {
    expect(formatFoodQuantity({ name: 'Arroz', quantity: 120, unit: 'g' })).toBe('120g Arroz');
    expect(formatFoodQuantity({ name: 'Suco de laranja', quantity: 200, unit: 'ml' })).toBe(
      '200ml Suco de laranja'
    );
  });

  it('should separate countable units from the quantity', () => {
    expect(formatFoodQuantity({ name: 'Ovo', quantity: 2, unit: 'unidades' })).toBe(
      '2 unidades Ovo'
    );
  });
});
