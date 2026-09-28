import AppleIcon from 'lucide-react-native/icons/apple';
import BeefIcon from 'lucide-react-native/icons/beef';
import SaladIcon from 'lucide-react-native/icons/salad';
import type { IOption } from 'presentation/components/OptionCard/OptionCardTypes';
import type { Goal } from 'shared/constants/profile';

export const GOAL_SUMMARY: Record<Goal, { label: string; icon: IOption['icon'] }> = {
  LOSE: { label: 'Perder Peso', icon: SaladIcon },
  MAINTAIN: { label: 'Manter Peso', icon: AppleIcon },
  GAIN: { label: 'Ganhar Peso', icon: BeefIcon }
};
