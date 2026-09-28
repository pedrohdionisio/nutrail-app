import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useRef } from 'react';
import { Platform } from 'react-native';
import type {
  IDateTimePickerSheetBindings,
  IUseDateTimePickerParams
} from './UseDateTimePickerTypes';

export function useDateTimePicker({
  mode,
  value,
  maximumDate,
  onSelect
}: IUseDateTimePickerParams) {
  const sheetRef = useRef<BottomSheetModal>(null);

  function openPicker() {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode,
        value,
        maximumDate,
        is24Hour: true,
        onValueChange: (_, date) => onSelect({ date })
      });

      return;
    }

    sheetRef.current?.present();
  }

  const sheetBindings: IDateTimePickerSheetBindings = {
    sheetRef,
    mode,
    value,
    maximumDate,
    onSelect
  };

  return {
    sheetBindings,
    openPicker
  };
}
