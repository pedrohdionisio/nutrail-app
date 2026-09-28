import { useState } from 'react';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type {
  IHandleChangeDraftParams,
  IUseDateTimePickerSheetControllerParams
} from './DateTimePickerSheetTypes';

export function useDateTimePickerSheetController({
  sheetRef,
  value,
  onSelect
}: IUseDateTimePickerSheetControllerParams) {
  const { paddingBottom } = useScreenPadding();
  const [draft, setDraft] = useState<Date | null>(null);

  function handleChangeDraft({ date }: IHandleChangeDraftParams) {
    setDraft(date);
  }

  function handleConfirm() {
    onSelect({ date: draft ?? value });
    sheetRef.current?.dismiss();
  }

  function handleDismiss() {
    setDraft(null);
  }

  return {
    paddingBottom,
    draftValue: draft ?? value,
    handleChangeDraft,
    handleConfirm,
    handleDismiss
  };
}
