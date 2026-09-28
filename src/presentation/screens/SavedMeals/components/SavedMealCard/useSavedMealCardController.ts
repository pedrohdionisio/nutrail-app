import { useRef } from 'react';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { IUseSavedMealCardControllerParams } from './SavedMealCardTypes';
import { toItemsLabel } from './utils/toItemsLabel';

export function useSavedMealCardController({
  savedMeal,
  onPress,
  onDelete
}: IUseSavedMealCardControllerParams) {
  const swipeableRef = useRef<SwipeableMethods>(null);

  function handlePress() {
    onPress({ savedMealId: savedMeal.id });
  }

  function handleDelete() {
    swipeableRef.current?.close();
    onDelete({ savedMealId: savedMeal.id });
  }

  return {
    swipeableRef,
    itemsLabel: toItemsLabel(savedMeal.items),
    handlePress,
    handleDelete
  };
}
