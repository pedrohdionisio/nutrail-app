import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export type DateTimePickerMode = 'date' | 'time';

export interface IHandleSelectDateTimeParams {
  date: Date;
}

export interface IUseDateTimePickerParams {
  mode: DateTimePickerMode;
  value: Date;
  maximumDate?: Date;
  onSelect: (params: IHandleSelectDateTimeParams) => void;
}

export interface IDateTimePickerSheetBindings extends IUseDateTimePickerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
}
