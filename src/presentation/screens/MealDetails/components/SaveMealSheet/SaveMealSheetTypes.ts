import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface ISaveMealSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  mealId: string;
}

export interface IUseSaveMealSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
  mealId: string;
}
