import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import type { IMealSourceOptionsProps } from '../MealSourceOptions/MealSourceOptionsTypes';

export interface INewMealSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  onSelectSource: IMealSourceOptionsProps['onSelect'];
}
