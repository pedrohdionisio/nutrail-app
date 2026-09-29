import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { MealSourceOptions } from '../MealSourceOptions/MealSourceOptions';
import type { INewMealSheetProps } from './NewMealSheetTypes';

const SHEET_BACKGROUND = { backgroundColor: COLORS.white, borderRadius: 24 };

const HANDLE_INDICATOR = { backgroundColor: COLORS.gray[500], width: 40 };

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
      pressBehavior='close'
    />
  );
}

export function NewMealSheet({ sheetRef, onSelectSource }: INewMealSheetProps) {
  const { t } = useTranslation();
  const { paddingBottom } = useScreenPadding();

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      ref={sheetRef}
    >
      <BottomSheetView>
        <View className='gap-6 px-5 pt-4' style={{ paddingBottom }}>
          <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
            {t('home.newMealTitle')}
          </AppText>

          <MealSourceOptions onSelect={onSelectSource} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
