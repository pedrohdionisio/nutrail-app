import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { IDeleteSheetProps } from './DeleteSheetTypes';

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

export function DeleteSheet({
  sheetRef,
  title,
  description,
  apiErrorMessage,
  isDeleting,
  onConfirm,
  onCancel,
  onDismiss
}: IDeleteSheetProps) {
  const { t } = useTranslation();
  const { paddingBottom } = useScreenPadding();

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      onDismiss={onDismiss}
      ref={sheetRef}
    >
      <BottomSheetView>
        <View className='gap-6 px-5 pt-4' style={{ paddingBottom }}>
          <View className='gap-2'>
            <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
              {title}
            </AppText>

            <AppText color='muted' size='bodySm'>
              {description}
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
              disabled={isDeleting}
              onPress={onCancel}
              title={t('common.cancel')}
              variant='secondary'
            />
            <Button
              className='flex-1'
              isLoading={isDeleting}
              onPress={onConfirm}
              title={t('common.delete')}
              variant='danger'
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
