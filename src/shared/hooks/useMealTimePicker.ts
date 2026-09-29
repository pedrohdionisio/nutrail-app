import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { toDateAtTime } from 'shared/utils/toDateAtTime';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { toLocalTime } from 'shared/utils/toLocalTime';
import type { IHandleSelectDateTimeParams } from './UseDateTimePickerTypes';
import type { IUseMealTimePickerParams } from './UseMealTimePickerTypes';
import { useDateTimePicker } from './useDateTimePicker';

export function useMealTimePicker({ date }: IUseMealTimePickerParams) {
  const { t } = useTranslation();
  const [pickedTime, setPickedTime] = useState<string | null>(null);

  const now = new Date();
  const isToday = date === toLocalIsoDate(now);
  const time = pickedTime ?? toLocalTime(now);

  function handleSelectTime({ date: selected }: IHandleSelectDateTimeParams) {
    const selectedTime = toLocalTime(selected);

    if (isToday && selectedTime > toLocalTime(new Date())) {
      Alert.alert(t('common.invalidTimeTitle'), t('common.futureTimeMessage'));

      return;
    }

    setPickedTime(selectedTime);
  }

  const { sheetBindings, openPicker } = useDateTimePicker({
    mode: 'time',
    value: toDateAtTime(date, time),
    maximumDate: isToday ? now : undefined,
    onSelect: handleSelectTime
  });

  function getMealTime() {
    return pickedTime ?? toLocalTime(new Date());
  }

  return {
    timeLabel: time,
    timePickerSheetBindings: sheetBindings,
    handleOpenTimePicker: openPicker,
    getMealTime
  };
}
