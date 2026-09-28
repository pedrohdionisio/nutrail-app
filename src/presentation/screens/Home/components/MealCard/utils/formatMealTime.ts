export function formatMealTime(time: string) {
  const [hours = '', minutes = ''] = time.split(':');

  return `${Number(hours)}h${minutes}`;
}
