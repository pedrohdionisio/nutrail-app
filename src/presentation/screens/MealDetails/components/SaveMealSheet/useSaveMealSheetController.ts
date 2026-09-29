import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type SaveMealFormType,
  type SaveMealPayloadType,
  saveMealSchema
} from 'data/modules/savedMeal/useCases/saveMeal/schemas/saveMealSchema';
import { useSaveMeal } from 'data/modules/savedMeal/useCases/saveMeal/useSaveMeal';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { IUseSaveMealSheetControllerParams } from './SaveMealSheetTypes';

const EMPTY_FORM: SaveMealFormType = { name: '' };

export function useSaveMealSheetController({
  sheetRef,
  mealId
}: IUseSaveMealSheetControllerParams) {
  const { t } = useTranslation();
  const { paddingBottom } = useScreenPadding();
  const { saveMeal, isSavingMeal } = useSaveMeal();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<SaveMealFormType, unknown, SaveMealPayloadType>({
    resolver: zodResolver(saveMealSchema),
    defaultValues: EMPTY_FORM
  });

  const name = useWatch({ control, name: 'name' });

  async function onSubmit({ name }: SaveMealPayloadType) {
    setApiErrorMessage(null);

    try {
      await saveMeal({ mealId, name });
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));

      return;
    }

    sheetRef.current?.dismiss();
    Alert.alert(t('mealDetails.savedTitle'), t('mealDetails.savedMessage'));
  }

  function handleDismiss() {
    reset(EMPTY_FORM);
    setApiErrorMessage(null);
  }

  return {
    paddingBottom,
    control,
    apiErrorMessage,
    isSavingMeal,
    isSubmitDisabled: !name?.trim(),
    handleSubmit: handleSubmit(onSubmit),
    handleDismiss
  };
}
