import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDeleteSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  title: string;
  description: string;
  apiErrorMessage: string | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onDismiss: () => void;
}
