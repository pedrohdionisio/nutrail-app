import { useRef } from 'react';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { IUseMealCardControllerParams } from './MealCardTypes';

export function useMealCardController({ mealId, onPress, onDelete }: IUseMealCardControllerParams) {
  const swipeableRef = useRef<SwipeableMethods>(null);

  function handlePress() {
    onPress({ mealId });
  }

  function handleDelete() {
    swipeableRef.current?.close();
    onDelete({ mealId });
  }

  return {
    swipeableRef,
    handlePress,
    handleDelete
  };
}
