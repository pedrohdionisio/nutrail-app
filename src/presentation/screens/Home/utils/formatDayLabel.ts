import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { addDays } from './addDays';

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function getRelativeDayName(date: Date, today: Date) {
  const isoDate = toLocalIsoDate(date);

  if (isoDate === toLocalIsoDate(today)) {
    return 'Hoje';
  }

  if (isoDate === toLocalIsoDate(addDays(today, -1))) {
    return 'Ontem';
  }

  return WEEKDAYS[date.getDay()];
}

export function formatDayLabel(date: Date, today: Date) {
  return `${getRelativeDayName(date, today)}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}
