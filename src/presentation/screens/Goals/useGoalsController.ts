import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type UpdateGoalsFormType,
  type UpdateGoalsPayloadType,
  updateGoalsSchema
} from 'data/modules/goals/useCases/updateGoals/schemas/updateGoalsSchema';
import { useUpdateGoals } from 'data/modules/goals/useCases/updateGoals/useUpdateGoals';
import { useGetMe } from 'data/modules/me/useCases/getMe/useGetMe';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { IHandleSelectModeParams } from './components/GoalsModeSelector/GoalsModeSelectorTypes';
import { toGoalsFormValues } from './utils/toGoalsFormValues';

export function useGoalsController() {
  const navigation = useNavigation();
  const { me } = useGetMe();
  const { updateGoals, isUpdatingGoals } = useUpdateGoals();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit, setValue } = useForm<
    UpdateGoalsFormType,
    unknown,
    UpdateGoalsPayloadType
  >({
    resolver: zodResolver(updateGoalsSchema),
    values: me ? toGoalsFormValues(me.goals) : undefined,
    resetOptions: { keepDirtyValues: true }
  });

  const values = useWatch({ control });
  const mode = values.mode ?? 'calories';
  const isCaloriesMode = mode === 'calories';

  async function onSubmit(goals: UpdateGoalsPayloadType) {
    setApiErrorMessage(null);

    try {
      await updateGoals(goals);
      navigation.goBack();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  function handleSelectMode({ mode }: IHandleSelectModeParams) {
    setValue('mode', mode, { shouldDirty: true });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return {
    control,
    mode,
    isCaloriesMode,
    apiErrorMessage,
    isUpdatingGoals,
    isSaveDisabled: isCaloriesMode
      ? !values.calories
      : !values.carbohydrate || !values.protein || !values.fat,
    handleSelectMode,
    handleGoBack,
    handleSave: handleSubmit(onSubmit)
  };
}
