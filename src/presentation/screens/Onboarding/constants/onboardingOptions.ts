import type { TranslationKey } from 'data/config/i18n';
import AppleIcon from 'lucide-react-native/icons/apple';
import BeefIcon from 'lucide-react-native/icons/beef';
import SaladIcon from 'lucide-react-native/icons/salad';
import type { IOption } from 'presentation/components/OptionCard/OptionCardTypes';
import type { Goal } from 'shared/constants/profile';

export const GOAL_SUMMARY: Record<Goal, { label: TranslationKey; icon: IOption['icon'] }> = {
  LOSE: { label: 'onboarding.goalSummary.LOSE', icon: SaladIcon },
  MAINTAIN: { label: 'onboarding.goalSummary.MAINTAIN', icon: AppleIcon },
  GAIN: { label: 'onboarding.goalSummary.GAIN', icon: BeefIcon }
};
