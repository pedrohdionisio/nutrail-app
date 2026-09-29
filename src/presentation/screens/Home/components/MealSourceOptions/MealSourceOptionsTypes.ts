import type { TranslationKey } from 'data/config/i18n';
import type { LucideIcon } from 'lucide-react-native';
import type { MealInputType } from 'shared/constants/meal';

export type MealSource = Extract<MealInputType, 'AUDIO' | 'PICTURE'>;

export interface IMealSourceOption {
  source: MealSource;
  label: TranslationKey;
  accessibilityLabel: TranslationKey;
  icon: LucideIcon;
}

export interface IHandleSelectMealSourceParams {
  source: MealInputType | 'SAVED';
}

export interface IMealSourceOptionsProps {
  onSelect: (params: IHandleSelectMealSourceParams) => void;
}
