import type { IMacroShareStyle } from '../MacrosPanelTypes';

export const MACRO_SHARE_STYLES: IMacroShareStyle[] = [
  {
    key: 'carbohydrate',
    label: 'common.carbohydrate',
    textClassName: 'text-support-yellow',
    barClassName: 'bg-support-yellow'
  },
  {
    key: 'protein',
    label: 'common.protein',
    textClassName: 'text-support-teal',
    barClassName: 'bg-support-teal'
  },
  {
    key: 'fat',
    label: 'common.fat',
    textClassName: 'text-support-orange',
    barClassName: 'bg-support-orange'
  }
];
