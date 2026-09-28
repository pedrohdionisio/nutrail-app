import type { LucideIcon } from 'lucide-react-native';

export interface IHomeHeaderActionProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}
