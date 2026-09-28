import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IChangePasswordSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
}

export interface IUseChangePasswordSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
}
