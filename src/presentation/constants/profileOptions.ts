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
import type { IOption } from 'presentation/components/OptionCard/OptionCardTypes';

export const GOAL_OPTIONS: IOption[] = [
  { value: 'LOSE', label: 'options.goal.LOSE', icon: SaladIcon },
  { value: 'MAINTAIN', label: 'options.goal.MAINTAIN', icon: AppleIcon },
  { value: 'GAIN', label: 'options.goal.GAIN', icon: BeefIcon }
];

export const GENDER_OPTIONS: IOption[] = [
  { value: 'MALE', label: 'options.gender.MALE', icon: MarsIcon },
  { value: 'FEMALE', label: 'options.gender.FEMALE', icon: VenusIcon }
];

export const ACTIVITY_LEVEL_OPTIONS: IOption[] = [
  {
    value: 'SEDENTARY',
    label: 'options.activityLevel.SEDENTARY',
    description: 'options.activityLevelDescription.SEDENTARY',
    icon: ArmchairIcon
  },
  {
    value: 'LIGHT',
    label: 'options.activityLevel.LIGHT',
    description: 'options.activityLevelDescription.LIGHT',
    icon: LeafIcon
  },
  {
    value: 'MODERATE',
    label: 'options.activityLevel.MODERATE',
    description: 'options.activityLevelDescription.MODERATE',
    icon: ZapIcon
  },
  {
    value: 'HEAVY',
    label: 'options.activityLevel.HEAVY',
    description: 'options.activityLevelDescription.HEAVY',
    icon: FlameIcon
  },
  {
    value: 'ATHLETE',
    label: 'options.activityLevel.ATHLETE',
    description: 'options.activityLevelDescription.ATHLETE',
    icon: DumbbellIcon
  }
];
