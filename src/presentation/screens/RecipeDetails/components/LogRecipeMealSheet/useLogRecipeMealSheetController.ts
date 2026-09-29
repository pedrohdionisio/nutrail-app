import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import { getLanguage } from 'data/config/i18n';
import {
  type CreateMealFromRecipeFormType,
  type CreateMealFromRecipePayloadType,
  createMealFromRecipeSchema
} from 'data/modules/meal/useCases/createMealFromRecipe/schemas/createMealFromRecipeSchema';
import { useCreateMealFromRecipe } from 'data/modules/meal/useCases/createMealFromRecipe/useCreateMealFromRecipe';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { toDateInput } from 'shared/utils/toDateInput';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { toLocalTime } from 'shared/utils/toLocalTime';
import type { IUseLogRecipeMealSheetControllerParams } from './LogRecipeMealSheetTypes';

function getNowFormValues(): CreateMealFromRecipeFormType {
  const now = new Date();

  return { date: toDateInput(toLocalIsoDate(now), getLanguage()), time: toLocalTime(now) };
}

export function useLogRecipeMealSheetController({
  sheetRef,
  recipeId
}: IUseLogRecipeMealSheetControllerParams) {
  const { t } = useTranslation();
  const { paddingBottom } = useScreenPadding();
  const { createMealFromRecipe, isCreatingMealFromRecipe } = useCreateMealFromRecipe();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<
    CreateMealFromRecipeFormType,
    unknown,
    CreateMealFromRecipePayloadType
  >({
    resolver: zodResolver(createMealFromRecipeSchema),
    defaultValues: getNowFormValues()
  });

  const [date, time] = useWatch({ control, name: ['date', 'time'] });

  async function onSubmit(payload: CreateMealFromRecipePayloadType) {
    setApiErrorMessage(null);

    try {
      await createMealFromRecipe({ recipeId, ...payload });
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));

      return;
    }

    sheetRef.current?.dismiss();
    Alert.alert(t('recipes.loggedTitle'), t('recipes.loggedMessage'));
  }

  function handleDismiss() {
    reset(getNowFormValues());
    setApiErrorMessage(null);
  }

  return {
    paddingBottom,
    control,
    apiErrorMessage,
    isCreatingMealFromRecipe,
    isSubmitDisabled: !date || !time,
    handleSubmit: handleSubmit(onSubmit),
    handleDismiss
  };
}
