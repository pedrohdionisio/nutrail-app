import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface ILogRecipeMealSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  recipeId: string;
}

export interface IUseLogRecipeMealSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
  recipeId: string;
}
