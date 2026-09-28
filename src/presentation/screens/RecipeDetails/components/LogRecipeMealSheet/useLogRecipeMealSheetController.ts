import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type CreateMealFromRecipeFormType,
  type CreateMealFromRecipePayloadType,
  createMealFromRecipeSchema
} from 'data/modules/meal/useCases/createMealFromRecipe/schemas/createMealFromRecipeSchema';
import { useCreateMealFromRecipe } from 'data/modules/meal/useCases/createMealFromRecipe/useCreateMealFromRecipe';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { toBrazilianDate } from 'shared/utils/toBrazilianDate';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import { toLocalTime } from 'shared/utils/toLocalTime';
import type { IUseLogRecipeMealSheetControllerParams } from './LogRecipeMealSheetTypes';

function getNowFormValues(): CreateMealFromRecipeFormType {
  const now = new Date();

  return { date: toBrazilianDate(toLocalIsoDate(now)), time: toLocalTime(now) };
}

export function useLogRecipeMealSheetController({
  sheetRef,
  recipeId
}: IUseLogRecipeMealSheetControllerParams) {
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
    Alert.alert('Refeição registrada', 'A receita já aparece no dia escolhido.');
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
