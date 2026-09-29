import { toDateInput } from 'shared/utils/toDateInput';

describe('toDateInput', () => {
  it('should reorder the ISO date into day, month and year in Portuguese', () => {
    expect(toDateInput('1990-03-07', 'pt-BR')).toBe('07/03/1990');
  });

  it('should reorder the ISO date into month, day and year in English', () => {
    expect(toDateInput('1990-03-07', 'en-US')).toBe('03/07/1990');
  });
});
