import type { TranslationKey } from 'data/config/i18n';
import type { LucideIcon } from 'lucide-react-native';

export type OptionCardOrientation = 'row' | 'column';

export interface IOption {
  value: string;
  label: TranslationKey;
  description?: TranslationKey;
  icon: LucideIcon;
}

export interface IOptionCardProps {
  option: IOption;
  isSelected: boolean;
  orientation: OptionCardOrientation;
  onPress: () => void;
}
