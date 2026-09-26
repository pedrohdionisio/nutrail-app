import type { IMealItem } from 'shared/entities/IMealItem';

const ATTACHED_UNITS = ['g', 'ml'];

export function formatMealItem({ name, quantity, unit }: IMealItem) {
  const separator = ATTACHED_UNITS.includes(unit.toLowerCase()) ? '' : ' ';

  return `${quantity}${separator}${unit} ${name}`;
}
