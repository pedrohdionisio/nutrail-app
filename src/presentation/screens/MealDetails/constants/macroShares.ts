import type { IMacroShareStyle } from '../MealDetailsTypes';

export const MACRO_SHARE_STYLES: IMacroShareStyle[] = [
  {
    key: 'carbohydrate',
    label: 'Carboidratos',
    textClassName: 'text-support-yellow',
    barClassName: 'bg-support-yellow'
  },
  {
    key: 'protein',
    label: 'Proteínas',
    textClassName: 'text-support-teal',
    barClassName: 'bg-support-teal'
  },
  {
    key: 'fat',
    label: 'Gorduras',
    textClassName: 'text-support-orange',
    barClassName: 'bg-support-orange'
  }
];
