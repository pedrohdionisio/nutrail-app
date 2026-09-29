import { getLanguage } from 'data/config/i18n';

export function formatMealTime(time: string) {
  const [hours = '', minutes = ''] = time.split(':');

  if (getLanguage() === 'en-US') {
    const period = Number(hours) < 12 ? 'AM' : 'PM';

    return `${Number(hours) % 12 || 12}:${minutes} ${period}`;
  }

  return `${Number(hours)}h${minutes}`;
}
