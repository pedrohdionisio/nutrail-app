import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IOnboardingHeaderProps } from './OnboardingHeaderTypes';

export function OnboardingHeader({ progress, onBack }: IOnboardingHeaderProps) {
  const { t } = useTranslation();
  return (
    <View className='h-11 flex-row items-center gap-8'>
      <Pressable
        accessibilityLabel={t('common.back')}
        accessibilityRole='button'
        className='-ml-2 h-11 w-11 items-center justify-center rounded-lg active:opacity-60'
        onPress={onBack}
      >
        <ChevronLeftIcon color={COLORS.black[700]} size={24} strokeWidth={2} />
      </Pressable>

      <View
        accessibilityRole='progressbar'
        accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
        className='mr-9 h-1 flex-1 overflow-hidden rounded-full bg-gray-300'
      >
        <View className='h-full rounded-full bg-lime-700' style={{ width: `${progress * 100}%` }} />
      </View>
    </View>
  );
}
