import { i18n } from 'data/config/i18n';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { addDays } from './addDays';

const WEEKDAY_KEYS = [
  'home.weekdays.0',
  'home.weekdays.1',
  'home.weekdays.2',
  'home.weekdays.3',
  'home.weekdays.4',
  'home.weekdays.5',
  'home.weekdays.6'
] as const;

const MONTH_KEYS = [
  'home.months.0',
  'home.months.1',
  'home.months.2',
  'home.months.3',
  'home.months.4',
  'home.months.5',
  'home.months.6',
  'home.months.7',
  'home.months.8',
  'home.months.9',
  'home.months.10',
  'home.months.11'
] as const;

function getRelativeDayName(date: Date, today: Date) {
  const isoDate = toLocalIsoDate(date);

  if (isoDate === toLocalIsoDate(today)) {
    return i18n.t('home.today');
  }

  if (isoDate === toLocalIsoDate(addDays(today, -1))) {
    return i18n.t('home.yesterday');
  }

  return i18n.t(WEEKDAY_KEYS[date.getDay()] ?? 'home.weekdays.0');
}

export function formatDayLabel(date: Date, today: Date) {
  return i18n.t('home.dayLabel', {
    day: getRelativeDayName(date, today),
    date: date.getDate(),
    month: i18n.t(MONTH_KEYS[date.getMonth()] ?? 'home.months.0')
  });
}
