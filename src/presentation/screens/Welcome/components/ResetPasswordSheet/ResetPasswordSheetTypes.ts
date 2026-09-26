import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IResetPasswordSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  email: string;
  onPasswordReset: () => void;
}

export interface IUseResetPasswordSheetControllerParams {
  email: string;
  onPasswordReset: () => void;
}
