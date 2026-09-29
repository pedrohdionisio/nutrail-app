import { i18n } from 'data/config/i18n';
import { formatMealTime } from 'presentation/screens/Home/components/MealCard/utils/formatMealTime';

describe('formatMealTime', () => {
  it('should show the meal time without the leading zero of the hour', () => {
    expect(formatMealTime('12:05')).toBe('12h05');
    expect(formatMealTime('08:30')).toBe('8h30');
  });

  it('should show the meal time in the American format in English', async () => {
    await i18n.changeLanguage('en-US');

    expect(formatMealTime('12:05')).toBe('12:05 PM');
    expect(formatMealTime('08:30')).toBe('8:30 AM');
    expect(formatMealTime('00:15')).toBe('12:15 AM');
    expect(formatMealTime('19:40')).toBe('7:40 PM');
  });
});
