import type { LucideIcon } from 'lucide-react-native';

export type OptionCardOrientation = 'row' | 'column';

export interface IOption {
  value: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}

export interface IOptionCardProps {
  option: IOption;
  isSelected: boolean;
  orientation: OptionCardOrientation;
  onPress: () => void;
}
