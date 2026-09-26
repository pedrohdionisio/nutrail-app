import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { IAuthSheetProps } from './AuthSheetTypes';

const LOGO_AREA_HEIGHT = 72;

const SHEET_BACKGROUND = { backgroundColor: COLORS.white, borderRadius: 16 };

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0}
      pressBehavior='close'
    />
  );
}

export function AuthSheet({ sheetRef, title, description, children }: IAuthSheetProps) {
  const { paddingBottom } = useScreenPadding();
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      android_keyboardInputMode='adjustResize'
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleComponent={null}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      ref={sheetRef}
      stackBehavior='replace'
      topInset={top + LOGO_AREA_HEIGHT}
    >
      <BottomSheetScrollView keyboardShouldPersistTaps='handled'>
        <View className='gap-6 px-6 pt-8' style={{ paddingBottom }}>
          <View className='gap-2'>
            <AppText accessibilityRole='header' size='title1'>
              {title}
            </AppText>

            {!!description && (
              <AppText color='muted' size='bodySm'>
                {description}
              </AppText>
            )}
          </View>

          {children}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
