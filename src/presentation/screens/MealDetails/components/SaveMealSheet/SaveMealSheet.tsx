import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ISaveMealSheetProps } from './SaveMealSheetTypes';
import { useSaveMealSheetController } from './useSaveMealSheetController';

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

export function SaveMealSheet({ sheetRef, mealId }: ISaveMealSheetProps) {
  const {
    paddingBottom,
    control,
    apiErrorMessage,
    isSavingMeal,
    isSubmitDisabled,
    handleSubmit,
    handleDismiss
  } = useSaveMealSheetController({ sheetRef, mealId });

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
              Salvar refeição
            </AppText>

            <AppText color='muted' size='bodySm'>
              Os itens e macros ficam guardados para você cadastrar esta refeição de novo com um
              toque.
            </AppText>
          </View>

          <Input
            control={control}
            label='Nome'
            maxLength={60}
            name='name'
            placeholder='Ex.: Café da manhã de sempre'
          />

          {!!apiErrorMessage && (
            <AppText color='error' size='bodySm'>
              {apiErrorMessage}
            </AppText>
          )}

          <Button
            disabled={isSubmitDisabled}
            isLoading={isSavingMeal}
            onPress={handleSubmit}
            title='Salvar'
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
