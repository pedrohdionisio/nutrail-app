import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { MEAL_CARD_FALLBACK_TITLES } from './constants/mealCardTitles';
import type { IUseMealCardControllerParams } from './MealCardTypes';
import { formatMealTime } from './utils/formatMealTime';
import { toMealCardState } from './utils/toMealCardState';

export function useMealCardController({
  meal,
  onPress,
  onDelete,
  onRetry
}: IUseMealCardControllerParams) {
  const { t } = useTranslation();
  const swipeableRef = useRef<SwipeableMethods>(null);

  const state = toMealCardState(meal.status);

  function handlePress() {
    onPress({ mealId: meal.id });
  }

  function handleDelete() {
    swipeableRef.current?.close();
    onDelete({ mealId: meal.id });
  }

  function handleRetry() {
    onRetry({ mealId: meal.id });
  }

  return {
    swipeableRef,
    state,
    title: meal.name ?? t(MEAL_CARD_FALLBACK_TITLES[state]),
    timeLabel: formatMealTime(meal.time),
    handlePress,
    handleDelete,
    handleRetry
  };
}
