import { toProgressWidth } from './toProgressWidth';

describe('toProgressWidth', () => {
  it('should convert the value into a percentage of the max', () => {
    expect(toProgressWidth(50, 200)).toBe('25%');
  });

  it('should stop at the full bar when the value passes the max', () => {
    expect(toProgressWidth(300, 200)).toBe('100%');
  });

  it('should stay empty without a max', () => {
    expect(toProgressWidth(10, 0)).toBe('0%');
  });
});
