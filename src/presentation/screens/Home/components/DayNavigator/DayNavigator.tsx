import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import ChevronRightIcon from 'lucide-react-native/icons/chevron-right';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IDayNavigatorProps } from './DayNavigatorTypes';

const HIT_SLOP = 8;

export function DayNavigator({
  label,
  canGoToNextDay,
  onPreviousDay,
  onNextDay
}: IDayNavigatorProps) {
  return (
    <View className='flex-row items-center justify-between py-2'>
      <Pressable
        accessibilityLabel='Dia anterior'
        accessibilityRole='button'
        className='h-10 w-10 items-center justify-center rounded-full active:bg-gray-200'
        hitSlop={HIT_SLOP}
        onPress={onPreviousDay}
      >
        <ChevronLeftIcon color={COLORS.black[700]} size={20} strokeWidth={2} />
      </Pressable>

      <AppText accessibilityRole='header' color='muted' size='caption'>
        {label}
      </AppText>

      <Pressable
        accessibilityLabel='Próximo dia'
        accessibilityRole='button'
        accessibilityState={{ disabled: !canGoToNextDay }}
        className={cn(
          'h-10 w-10 items-center justify-center rounded-full active:bg-gray-200',
          !canGoToNextDay && 'opacity-30'
        )}
        disabled={!canGoToNextDay}
        hitSlop={HIT_SLOP}
        onPress={onNextDay}
      >
        <ChevronRightIcon color={COLORS.black[700]} size={20} strokeWidth={2} />
      </Pressable>
    </View>
  );
}
