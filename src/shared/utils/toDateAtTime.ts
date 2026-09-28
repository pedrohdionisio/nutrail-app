export function toDateAtTime(isoDate: string, time: string) {
  const [year = 0, month = 1, day = 1] = isoDate.split('-').map(Number);
  const [hours = 0, minutes = 0] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}
