import { parseBrazilianDate } from './parseBrazilianDate';

describe('parseBrazilianDate', () => {
  it('should convert DD/MM/AAAA to an ISO date', () => {
    expect(parseBrazilianDate('07/03/1990')).toBe('1990-03-07');
  });

  it('should refuse dates that do not exist', () => {
    expect(parseBrazilianDate('31/02/2000')).toBeNull();
    expect(parseBrazilianDate('29/02/2023')).toBeNull();
    expect(parseBrazilianDate('00/01/2000')).toBeNull();
  });

  it('should accept a leap day', () => {
    expect(parseBrazilianDate('29/02/2024')).toBe('2024-02-29');
  });

  it('should refuse incomplete input', () => {
    expect(parseBrazilianDate('07/03/19')).toBeNull();
    expect(parseBrazilianDate('')).toBeNull();
  });
});
