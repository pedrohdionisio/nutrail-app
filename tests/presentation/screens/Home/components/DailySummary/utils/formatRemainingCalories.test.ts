import { i18n } from 'data/config/i18n';
import { formatRemainingCalories } from 'presentation/screens/Home/components/DailySummary/utils/formatRemainingCalories';

describe('formatRemainingCalories', () => {
  it('should show what is left of the goal', () => {
    expect(formatRemainingCalories(700, 2000)).toBe('1300 kcal restantes');
  });

  it('should show how much the goal was exceeded', () => {
    expect(formatRemainingCalories(2150, 2000)).toBe('150 kcal acima da meta');
  });

  it('should show the calories in English', async () => {
    await i18n.changeLanguage('en-US');

    expect(formatRemainingCalories(1500, 2000)).toBe('500 kcal left');
    expect(formatRemainingCalories(2150, 2000)).toBe('150 kcal over the goal');
  });
});
