import type { LucideIcon } from 'lucide-react-native';

export interface IMealSourceButtonProps {
  label: string;
  accessibilityLabel: string;
  icon: LucideIcon;
  onPress: () => void;
}
