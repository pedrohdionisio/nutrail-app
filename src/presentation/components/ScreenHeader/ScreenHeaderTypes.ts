import type { LucideIcon } from 'lucide-react-native';

export interface IScreenHeaderAction {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress: () => void;
}

export interface IScreenHeaderProps {
  title: string;
  onBack: () => void;
  action?: IScreenHeaderAction;
}
