import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getLanguage } from 'data/config/i18n';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IDateTimePickerSheetProps } from './DateTimePickerSheetTypes';
import { useDateTimePickerSheetController } from './useDateTimePickerSheetController';

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

export function DateTimePickerSheet({
  sheetRef,
  title,
  mode,
  value,
  maximumDate,
  onSelect
}: IDateTimePickerSheetProps) {
  const { t } = useTranslation();
  const { paddingBottom, draftValue, handleChangeDraft, handleConfirm, handleDismiss } =
    useDateTimePickerSheetController({ sheetRef, value, onSelect });

  if (Platform.OS === 'android') {
    return null;
  }

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      onDismiss={handleDismiss}
      ref={sheetRef}
    >
      <BottomSheetView>
        <View className='gap-4 px-5 pt-4' style={{ paddingBottom }}>
          <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
            {title}
          </AppText>

          <DateTimePicker
            accentColor={COLORS.lime[700]}
            display={mode === 'date' ? 'inline' : 'spinner'}
            locale={getLanguage()}
            maximumDate={maximumDate}
            mode={mode}
            onValueChange={(_, date) => handleChangeDraft({ date })}
            themeVariant='light'
            value={draftValue}
          />

          <Button onPress={handleConfirm} title={t('common.confirm')} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
