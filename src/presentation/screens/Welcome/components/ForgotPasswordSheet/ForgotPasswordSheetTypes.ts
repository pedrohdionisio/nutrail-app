import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface ICodeSentParams {
  email: string;
}

export interface IForgotPasswordSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
  onCodeSent: (params: ICodeSentParams) => void;
}

export interface IUseForgotPasswordSheetControllerParams {
  onCodeSent: (params: ICodeSentParams) => void;
}
