import { maskTime } from './maskTime';

describe('maskTime', () => {
  it('should add the colon while typing', () => {
    expect(maskTime('1')).toBe('1');
    expect(maskTime('123')).toBe('12:3');
    expect(maskTime('1230')).toBe('12:30');
  });

  it('should drop extra digits and anything that is not a digit', () => {
    expect(maskTime('12:305')).toBe('12:30');
    expect(maskTime('a1h2')).toBe('12');
  });
});
