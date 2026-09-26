import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RouteProp,
  useNavigation,
  usePreventRemove,
  useRoute
} from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import {
  type CreateManualMealFormType,
  type CreateManualMealPayloadType,
  createManualMealSchema
} from 'data/modules/meal/useCases/createManualMeal/schemas/createManualMealSchema';
import { useCreateManualMeal } from 'data/modules/meal/useCases/createManualMeal/useCreateManualMeal';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert } from 'react-native';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { toBrazilianDate } from 'shared/utils/toBrazilianDate';
import { toTimeInputValue } from './utils/toTimeInputValue';

export function useManualMealController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'ManualMeal'>>();
  const { createManualMeal } = useCreateManualMeal();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<
    CreateManualMealFormType,
    unknown,
    CreateManualMealPayloadType
  >({
    resolver: zodResolver(createManualMealSchema),
    defaultValues: {
      text: '',
      date: toBrazilianDate(params.date),
      time: toTimeInputValue(new Date()),
      pictureUri: null
    }
  });

  const [text, date, time] = useWatch({ control, name: ['text', 'date', 'time'] });

  usePreventRemove(isAnalyzing, () => {});

  useEffect(() => {
    if (hasFinished) {
      navigation.goBack();
    }
  }, [hasFinished, navigation]);

  async function onSubmit(meal: CreateManualMealPayloadType) {
    setApiErrorMessage(null);
    setIsAnalyzing(true);

    try {
      const { isPictureUploaded } = await createManualMeal(meal);

      if (!isPictureUploaded) {
        Alert.alert(
          'Refeição cadastrada sem a foto',
          'Os macros foram calculados, mas não conseguimos enviar a foto.'
        );
      }

      setHasFinished(true);
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return {
    control,
    shouldShowAnalyzing: isAnalyzing || hasFinished,
    apiErrorMessage,
    isSubmitDisabled: !text?.trim() || !date || !time,
    handleGoBack,
    handleSubmit: handleSubmit(onSubmit)
  };
}
