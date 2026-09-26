import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IGoalsHeaderProps } from './GoalsHeaderTypes';

const HEADER_TOP_SPACING = 8;

export function GoalsHeader({ onBack }: IGoalsHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      className='h-11 flex-row items-center px-5'
      style={{ marginTop: top + HEADER_TOP_SPACING }}
    >
      <Pressable
        accessibilityLabel='Voltar'
        accessibilityRole='button'
        className='-ml-2 h-11 w-11 items-center justify-center rounded-lg active:opacity-60'
        onPress={onBack}
      >
        <ChevronLeftIcon color={COLORS.black[700]} size={24} strokeWidth={2} />
      </Pressable>

      <AppText accessibilityRole='header' align='center' className='flex-1'>
        Suas Metas
      </AppText>

      <View className='w-9' />
    </View>
  );
}
