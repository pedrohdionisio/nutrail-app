import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { maskDate } from 'shared/utils/maskDate';
import { maskTime } from 'shared/utils/maskTime';
import type { ILogRecipeMealSheetProps } from './LogRecipeMealSheetTypes';
import { useLogRecipeMealSheetController } from './useLogRecipeMealSheetController';

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

export function LogRecipeMealSheet({ sheetRef, recipeId }: ILogRecipeMealSheetProps) {
  const { t } = useTranslation();
  const {
    paddingBottom,
    control,
    apiErrorMessage,
    isCreatingMealFromRecipe,
    isSubmitDisabled,
    handleSubmit,
    handleDismiss
  } = useLogRecipeMealSheetController({ sheetRef, recipeId });

  return (
    <BottomSheetModal
      android_keyboardInputMode='adjustResize'
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      onDismiss={handleDismiss}
      ref={sheetRef}
    >
      <BottomSheetView>
        <View className='gap-6 px-5 pt-4' style={{ paddingBottom }}>
          <View className='gap-2'>
            <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
              {t('recipes.logAsMeal')}
            </AppText>

            <AppText color='muted' size='bodySm'>
              {t('recipes.logDescription')}
            </AppText>
          </View>

          <View className='flex-row gap-4'>
            <View className='flex-1'>
              <Input
                control={control}
                keyboardType='number-pad'
                label={t('common.date')}
                mask={maskDate}
                maxLength={10}
                name='date'
                placeholder={t('common.dateInputPlaceholder')}
              />
            </View>

            <View className='flex-1'>
              <Input
                control={control}
                keyboardType='number-pad'
                label={t('common.time')}
                mask={maskTime}
                maxLength={5}
                name='time'
                placeholder='HH:MM'
              />
            </View>
          </View>

          {!!apiErrorMessage && (
            <AppText color='error' size='bodySm'>
              {apiErrorMessage}
            </AppText>
          )}

          <Button
            disabled={isSubmitDisabled}
            isLoading={isCreatingMealFromRecipe}
            onPress={handleSubmit}
            title={t('recipes.logMeal')}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
