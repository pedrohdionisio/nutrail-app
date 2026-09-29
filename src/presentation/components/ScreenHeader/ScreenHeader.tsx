import ChevronLeftIcon from 'lucide-react-native/icons/chevron-left';
import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import type { IScreenHeaderProps } from './ScreenHeaderTypes';

const HEADER_TOP_SPACING = 8;

export function ScreenHeader({ title, onBack, action }: IScreenHeaderProps) {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <View
      className='h-11 flex-row items-center justify-between px-3'
      style={{ marginTop: top + HEADER_TOP_SPACING }}
    >
      <Pressable
        accessibilityLabel={t('common.back')}
        accessibilityRole='button'
        className='h-11 w-11 items-center justify-center rounded-lg active:opacity-60'
        onPress={onBack}
      >
        <ChevronLeftIcon color={COLORS.black[700]} size={24} strokeWidth={2} />
      </Pressable>

      <AppText accessibilityRole='header' align='center' className='flex-1'>
        {title}
      </AppText>

      {action ? (
        <Pressable
          accessibilityLabel={action.accessibilityLabel}
          accessibilityRole='button'
          className='h-11 w-11 items-center justify-center rounded-lg active:opacity-60'
          onPress={action.onPress}
        >
          <action.icon color={COLORS.black[700]} size={22} strokeWidth={2} />
        </Pressable>
      ) : (
        <View className='w-11' />
      )}
    </View>
  );
}
