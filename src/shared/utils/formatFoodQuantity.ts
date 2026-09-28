import type { IIngredient } from 'shared/entities/IIngredient';

const ATTACHED_UNITS = ['g', 'ml'];

export function formatFoodQuantity({ name, quantity, unit }: IIngredient) {
  const separator = ATTACHED_UNITS.includes(unit.toLowerCase()) ? '' : ' ';

  return `${quantity}${separator}${unit} ${name}`;
}
