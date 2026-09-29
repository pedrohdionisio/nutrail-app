import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, usePreventRemove } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useSaveRecipe } from 'data/modules/recipe/useCases/saveRecipe/useSaveRecipe';
import {
  type SuggestRecipeFormType,
  type SuggestRecipePayloadType,
  suggestRecipeSchema
} from 'data/modules/recipe/useCases/suggestRecipe/schemas/suggestRecipeSchema';
import { useSuggestRecipe } from 'data/modules/recipe/useCases/suggestRecipe/useSuggestRecipe';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import type { IRecipeContent } from 'shared/entities/IRecipeContent';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';

export function useSuggestRecipeController() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { suggestRecipe, isSuggestingRecipe } = useSuggestRecipe();
  const { saveRecipe, isSavingRecipe } = useSaveRecipe();
  const [suggestion, setSuggestion] = useState<IRecipeContent | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const { control, handleSubmit } = useForm<
    SuggestRecipeFormType,
    unknown,
    SuggestRecipePayloadType
  >({
    resolver: zodResolver(suggestRecipeSchema),
    defaultValues: { text: '' }
  });

  const text = useWatch({ control, name: 'text' });

  usePreventRemove((!!suggestion && !hasSaved) || isSuggestingRecipe || isSavingRecipe, () => {
    if (!isSuggestingRecipe && !isSavingRecipe) {
      setSuggestion(null);
    }
  });

  useEffect(() => {
    if (hasSaved) {
      navigation.goBack();
    }
  }, [hasSaved, navigation]);

  async function onSubmit({ text: ingredients }: SuggestRecipePayloadType) {
    setApiErrorMessage(null);

    try {
      setSuggestion(await suggestRecipe({ date: toLocalIsoDate(new Date()), text: ingredients }));
    } catch (error) {
      if (suggestion) {
        Alert.alert(t('recipes.suggestAnotherError'), getApiErrorMessage(error));
      } else {
        setApiErrorMessage(getApiErrorMessage(error));
      }
    }
  }

  function handleGoBack() {
    if (suggestion) {
      setSuggestion(null);

      return;
    }

    navigation.goBack();
  }

  async function handleSave() {
    if (!suggestion) {
      return;
    }

    try {
      await saveRecipe(suggestion);
      setHasSaved(true);
    } catch (error) {
      Alert.alert(t('recipes.saveError'), getApiErrorMessage(error));
    }
  }

  return {
    control,
    suggestion,
    apiErrorMessage,
    isSubmitDisabled: !text?.trim(),
    isSavingRecipe,
    shouldShowLoading: isSuggestingRecipe,
    handleGoBack,
    handleSubmit: handleSubmit(onSubmit),
    handleSave
  };
}
