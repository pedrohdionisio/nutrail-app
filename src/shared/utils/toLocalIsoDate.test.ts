import { toLocalIsoDate } from './toLocalIsoDate';

describe('toLocalIsoDate', () => {
  it('should keep the local day instead of converting to UTC', () => {
    expect(toLocalIsoDate(new Date(2026, 8, 25, 22, 30))).toBe('2026-09-25');
  });

  it('should pad month and day', () => {
    expect(toLocalIsoDate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
