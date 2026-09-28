import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDeleteAccountSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
}

export interface IUseDeleteAccountSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
}
