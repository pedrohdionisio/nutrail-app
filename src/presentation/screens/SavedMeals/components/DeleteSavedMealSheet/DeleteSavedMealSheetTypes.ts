import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDeleteSavedMealSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  savedMealId: string | null;
  onDeleted: () => void;
}

export interface IUseDeleteSavedMealSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
  savedMealId: string | null;
  onDeleted: () => void;
}
