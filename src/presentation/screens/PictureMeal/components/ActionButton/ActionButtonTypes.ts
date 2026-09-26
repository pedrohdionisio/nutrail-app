import type { LucideIcon } from 'lucide-react-native';

export type ActionButtonVariant = 'dark' | 'brand' | 'primary';

export interface IActionButtonProps {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: ActionButtonVariant;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
