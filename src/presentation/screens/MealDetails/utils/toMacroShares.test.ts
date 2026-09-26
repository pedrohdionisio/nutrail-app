import { toMacroShares } from './toMacroShares';

describe('toMacroShares', () => {
  it('should split the macros by their share of the total grams', () => {
    const shares = toMacroShares({ calories: 630, carbohydrate: 56, protein: 29, fat: 29 });

    expect(shares.map(({ key, value, percent }) => ({ key, value, percent }))).toEqual([
      { key: 'carbohydrate', value: '56g (49%)', percent: 49 },
      { key: 'protein', value: '29g (25%)', percent: 25 },
      { key: 'fat', value: '29g (25%)', percent: 25 }
    ]);
  });

  it('should return zero percent when the meal has no macros', () => {
    const shares = toMacroShares({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });

    expect(shares.map(({ value }) => value)).toEqual(['0g (0%)', '0g (0%)', '0g (0%)']);
  });

  it('should keep the labels without values while the meal is loading', () => {
    const shares = toMacroShares(null);

    expect(shares.map(({ label, value }) => ({ label, value }))).toEqual([
      { label: 'Carboidratos', value: null },
      { label: 'Proteínas', value: null },
      { label: 'Gorduras', value: null }
    ]);
  });
});
