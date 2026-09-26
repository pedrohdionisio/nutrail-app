import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface ISignInSheetProps {
  sheetRef: RefObject<BottomSheetModal | null>;
}
