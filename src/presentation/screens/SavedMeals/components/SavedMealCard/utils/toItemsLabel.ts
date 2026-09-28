import type { IMealItem } from 'shared/entities/IMealItem';

export function toItemsLabel(items: IMealItem[]) {
  return items.map(({ name }) => name).join(', ');
}
