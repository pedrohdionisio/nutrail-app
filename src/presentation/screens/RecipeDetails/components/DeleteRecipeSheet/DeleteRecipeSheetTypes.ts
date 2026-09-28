import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDeleteRecipeSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  recipeId: string;
  onDeleted: () => void;
}

export interface IUseDeleteRecipeSheetControllerParams {
  sheetRef: RefObject<BottomSheetModal | null>;
  recipeId: string;
  onDeleted: () => void;
}
