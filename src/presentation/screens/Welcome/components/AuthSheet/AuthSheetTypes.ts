import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { PropsWithChildren, RefObject } from 'react';

export interface IAuthSheetProps extends PropsWithChildren {
  sheetRef: RefObject<BottomSheetModal | null>;
  title: string;
  description?: string;
}
