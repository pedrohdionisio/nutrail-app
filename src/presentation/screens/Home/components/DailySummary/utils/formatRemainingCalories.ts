import { i18n } from 'data/config/i18n';

export function formatRemainingCalories(consumed: number, goal: number) {
  const difference = goal - consumed;

  if (difference < 0) {
    return i18n.t('home.caloriesOver', { count: -difference });
  }

  return i18n.t('home.caloriesLeft', { count: difference });
}
