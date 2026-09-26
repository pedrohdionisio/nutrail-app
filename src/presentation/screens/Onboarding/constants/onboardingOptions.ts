import AppleIcon from 'lucide-react-native/icons/apple';
import ArmchairIcon from 'lucide-react-native/icons/armchair';
import BeefIcon from 'lucide-react-native/icons/beef';
import DumbbellIcon from 'lucide-react-native/icons/dumbbell';
import FlameIcon from 'lucide-react-native/icons/flame';
import LeafIcon from 'lucide-react-native/icons/leaf';
import MarsIcon from 'lucide-react-native/icons/mars';
import SaladIcon from 'lucide-react-native/icons/salad';
import VenusIcon from 'lucide-react-native/icons/venus';
import ZapIcon from 'lucide-react-native/icons/zap';
import type { Goal } from 'shared/constants/profile';
import type { IOnboardingOption } from '../OnboardingTypes';

export const GOAL_OPTIONS: IOnboardingOption[] = [
  { value: 'LOSE', label: 'Perder peso', icon: SaladIcon },
  { value: 'MAINTAIN', label: 'Manter peso', icon: AppleIcon },
  { value: 'GAIN', label: 'Ganhar peso', icon: BeefIcon }
];

export const GOAL_SUMMARY: Record<Goal, { label: string; icon: IOnboardingOption['icon'] }> = {
  LOSE: { label: 'Perder Peso', icon: SaladIcon },
  MAINTAIN: { label: 'Manter Peso', icon: AppleIcon },
  GAIN: { label: 'Ganhar Peso', icon: BeefIcon }
};

export const GENDER_OPTIONS: IOnboardingOption[] = [
  { value: 'MALE', label: 'Masculino', icon: MarsIcon },
  { value: 'FEMALE', label: 'Feminino', icon: VenusIcon }
];

export const ACTIVITY_LEVEL_OPTIONS: IOnboardingOption[] = [
  { value: 'SEDENTARY', label: 'Sedentário', description: 'Não me exercito', icon: ArmchairIcon },
  { value: 'LIGHT', label: 'Leve', description: '1 a 2 vezes por semana', icon: LeafIcon },
  { value: 'MODERATE', label: 'Moderado', description: '3 a 5 vezes por semana', icon: ZapIcon },
  { value: 'HEAVY', label: 'Pesado', description: '6 a 7 vezes por semana', icon: FlameIcon },
  {
    value: 'ATHLETE',
    label: 'Atleta',
    description: 'Mais de 7 vezes por semana',
    icon: DumbbellIcon
  }
];
