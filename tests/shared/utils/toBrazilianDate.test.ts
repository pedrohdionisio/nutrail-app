import { toBrazilianDate } from 'shared/utils/toBrazilianDate';

describe('toBrazilianDate', () => {
  it('should reorder the ISO date into day, month and year', () => {
    expect(toBrazilianDate('1990-03-07')).toBe('07/03/1990');
  });
});
