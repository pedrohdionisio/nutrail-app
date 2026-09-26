import { maskDate } from './maskDate';

describe('maskDate', () => {
  it('should add the slashes while the user types', () => {
    expect(maskDate('0')).toBe('0');
    expect(maskDate('070')).toBe('07/0');
    expect(maskDate('07031')).toBe('07/03/1');
    expect(maskDate('07031990')).toBe('07/03/1990');
  });

  it('should drop anything that is not a digit and cap at eight digits', () => {
    expect(maskDate('07/03/1990123')).toBe('07/03/1990');
    expect(maskDate('ab07-03')).toBe('07/03');
  });
});
