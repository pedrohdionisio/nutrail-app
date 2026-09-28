import { zodResolver } from '@hookform/resolvers/zod';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useGetMeal } from 'data/modules/meal/useCases/getMeal/useGetMeal';
import {
  type UpdateMealFormType,
  type UpdateMealPayloadType,
  updateMealSchema
} from 'data/modules/meal/useCases/updateMeal/schemas/updateMealSchema';
import { useUpdateMeal } from 'data/modules/meal/useCases/updateMeal/useUpdateMeal';
import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type { IHandleAddItemsParams, IHandleRemoveItemParams } from './EditMealTypes';
import { toEditableItem } from './utils/toEditableItem';
import { toEditMealFormValues } from './utils/toEditMealFormValues';

export function useEditMealController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'EditMeal'>>();
  const { meal, isLoadingMeal, isRefetchingMeal, refetchMeal } = useGetMeal({
    mealId: params.mealId
  });
  const { updateMeal, isUpdatingMeal } = useUpdateMeal();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<UpdateMealFormType, unknown, UpdateMealPayloadType>({
    resolver: zodResolver(updateMealSchema),
    values: meal ? toEditMealFormValues(meal) : undefined,
    resetOptions: { keepDirtyValues: true }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const [name, date, time] = useWatch({ control, name: ['name', 'date', 'time'] });

  async function onSubmit(payload: UpdateMealPayloadType) {
    setApiErrorMessage(null);

    try {
      await updateMeal({ mealId: params.mealId, ...payload });
      navigation.goBack();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleRetry() {
    refetchMeal();
  }

  function handleRemoveItem({ index }: IHandleRemoveItemParams) {
    remove(index);
  }

  function handleAddItems({ items }: IHandleAddItemsParams) {
    append(items.map(toEditableItem));
  }

  return {
    control,
    items: fields,
    shouldShowForm: !!meal,
    shouldShowEmptyItems: fields.length === 0,
    isLoadingMeal,
    isRefetchingMeal,
    apiErrorMessage,
    isUpdatingMeal,
    isSaveDisabled: fields.length === 0 || !name?.trim() || !date || !time,
    handleGoBack,
    handleRetry,
    handleRemoveItem,
    handleAddItems,
    handleSave: handleSubmit(onSubmit)
  };
}
