export function formatMealTime(createdAt: string) {
  const date = new Date(createdAt);
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${date.getHours()}h${minutes}`;
}
