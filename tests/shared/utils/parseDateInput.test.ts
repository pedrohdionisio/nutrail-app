import { parseDateInput } from 'shared/utils/parseDateInput';

describe('parseDateInput', () => {
  it('should convert DD/MM/AAAA to an ISO date in Portuguese', () => {
    expect(parseDateInput('07/03/1990', 'pt-BR')).toBe('1990-03-07');
  });

  it('should convert MM/DD/YYYY to an ISO date in English', () => {
    expect(parseDateInput('03/07/1990', 'en-US')).toBe('1990-03-07');
    expect(parseDateInput('12/31/1990', 'en-US')).toBe('1990-12-31');
  });

  it('should refuse dates that do not exist', () => {
    expect(parseDateInput('31/02/2000', 'pt-BR')).toBeNull();
    expect(parseDateInput('29/02/2023', 'pt-BR')).toBeNull();
    expect(parseDateInput('00/01/2000', 'pt-BR')).toBeNull();
    expect(parseDateInput('31/12/1990', 'en-US')).toBeNull();
  });

  it('should accept a leap day', () => {
    expect(parseDateInput('29/02/2024', 'pt-BR')).toBe('2024-02-29');
    expect(parseDateInput('02/29/2024', 'en-US')).toBe('2024-02-29');
  });

  it('should refuse an incomplete value', () => {
    expect(parseDateInput('07/03/19', 'pt-BR')).toBeNull();
    expect(parseDateInput('', 'en-US')).toBeNull();
  });
});
