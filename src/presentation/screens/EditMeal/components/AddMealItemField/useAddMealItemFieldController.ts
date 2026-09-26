import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type AnalyzeMealItemsFormType,
  type AnalyzeMealItemsPayloadType,
  analyzeMealItemsSchema
} from 'data/modules/meal/useCases/analyzeMealItems/schemas/analyzeMealItemsSchema';
import { useAnalyzeMealItems } from 'data/modules/meal/useCases/analyzeMealItems/useAnalyzeMealItems';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { IUseAddMealItemFieldControllerParams } from './AddMealItemFieldTypes';

export function useAddMealItemFieldController({ onAdd }: IUseAddMealItemFieldControllerParams) {
  const { analyzeMealItems, isAnalyzingMealItems } = useAnalyzeMealItems();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<
    AnalyzeMealItemsFormType,
    unknown,
    AnalyzeMealItemsPayloadType
  >({
    resolver: zodResolver(analyzeMealItemsSchema),
    defaultValues: { text: '' }
  });

  const text = useWatch({ control, name: 'text' });

  async function onSubmit(payload: AnalyzeMealItemsPayloadType) {
    setApiErrorMessage(null);

    try {
      const items = await analyzeMealItems(payload);
      onAdd({ items });
      reset();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  return {
    control,
    apiErrorMessage,
    isAnalyzingMealItems,
    isAddDisabled: !text?.trim(),
    handleAdd: handleSubmit(onSubmit)
  };
}
