import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDeleteMealSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  mealId: string | null;
  onDeleted: () => void;
}

export interface IUseDeleteMealSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
  mealId: string | null;
  onDeleted: () => void;
}
