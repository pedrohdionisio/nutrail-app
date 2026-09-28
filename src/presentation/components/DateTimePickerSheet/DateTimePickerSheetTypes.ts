import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import type { IDateTimePickerSheetBindings } from 'shared/hooks/UseDateTimePickerTypes';

export interface IDateTimePickerSheetProps extends IDateTimePickerSheetBindings {
  title: string;
}

export interface IUseDateTimePickerSheetControllerParams
  extends Pick<IDateTimePickerSheetBindings, 'value' | 'onSelect'> {
  sheetRef: RefObject<BottomSheetModal | null>;
}

export interface IHandleChangeDraftParams {
  date: Date;
}
