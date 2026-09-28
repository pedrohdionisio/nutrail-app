import { formatMealTime } from 'presentation/screens/Home/components/MealCard/utils/formatMealTime';

describe('formatMealTime', () => {
  it('should show the meal time without the leading zero of the hour', () => {
    expect(formatMealTime('12:05')).toBe('12h05');
    expect(formatMealTime('08:30')).toBe('8h30');
  });
});
