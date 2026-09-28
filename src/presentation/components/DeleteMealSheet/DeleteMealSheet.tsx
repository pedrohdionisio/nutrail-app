import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IDeleteMealSheetProps } from './DeleteMealSheetTypes';
import { useDeleteMealSheetController } from './useDeleteMealSheetController';

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

export function DeleteMealSheet({ sheetRef, mealId, onDeleted }: IDeleteMealSheetProps) {
  const {
    paddingBottom,
    apiErrorMessage,
    isDeletingMeal,
    handleConfirm,
    handleCancel,
    handleDismiss
  } = useDeleteMealSheetController({ sheetRef, mealId, onDeleted });

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      onDismiss={handleDismiss}
      ref={sheetRef}
    >
      <BottomSheetView>
        <View className='gap-6 px-5 pt-4' style={{ paddingBottom }}>
          <View className='gap-2'>
            <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
              Excluir refeição?
            </AppText>

            <AppText color='muted' size='bodySm'>
              A refeição e a foto serão apagadas. Essa ação não pode ser desfeita.
            </AppText>
          </View>

          {!!apiErrorMessage && (
            <AppText color='error' size='bodySm'>
              {apiErrorMessage}
            </AppText>
          )}

          <View className='flex-row gap-4'>
            <Button
              className='flex-1'
              disabled={isDeletingMeal}
              onPress={handleCancel}
              title='Cancelar'
              variant='secondary'
            />
            <Button
              className='flex-1'
              isLoading={isDeletingMeal}
              onPress={handleConfirm}
              title='Excluir'
              variant='danger'
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
