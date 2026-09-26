import { MealPictureManager } from 'data/libs/MealPictureManager';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { Alert } from 'react-native';
import type { IUseMealPictureFieldControllerParams } from './MealPictureFieldTypes';

export function useMealPictureFieldController({ control }: IUseMealPictureFieldControllerParams) {
  const { field } = useController({ control, name: 'pictureUri' });
  const [isPicking, setIsPicking] = useState(false);

  async function handlePick() {
    setIsPicking(true);

    try {
      const pictureUri = await MealPictureManager.pick();

      if (pictureUri) {
        field.onChange(pictureUri);
      }
    } catch {
      Alert.alert('Não foi possível abrir suas fotos', 'Tente de novo em alguns instantes.');
    } finally {
      setIsPicking(false);
    }
  }

  function handleRemove() {
    field.onChange(null);
  }

  return {
    pictureUri: field.value,
    isPicking,
    handlePick,
    handleRemove
  };
}
