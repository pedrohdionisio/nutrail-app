import { formatMealTime } from './formatMealTime';

describe('formatMealTime', () => {
  it('should show the UTC timestamp in the local time', () => {
    expect(formatMealTime('2026-09-26T15:05:00.000Z')).toBe('12h05');
  });
});
