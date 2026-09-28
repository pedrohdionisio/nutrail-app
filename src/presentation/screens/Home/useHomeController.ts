import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useGetMe } from 'data/modules/me/useCases/getMe/useGetMe';
import { useListMealsByDay } from 'data/modules/meal/useCases/listMealsByDay/useListMealsByDay';
import { useRef, useState } from 'react';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { getInitials } from 'shared/utils/getInitials';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import type {
  IHandleDeleteMealParams,
  IHandleOpenMealParams
} from './components/MealCard/MealCardTypes';
import type { IHandleSelectMealSourceParams } from './components/MealSourceOptions/MealSourceOptionsTypes';
import { addDays } from './utils/addDays';
import { formatDayLabel } from './utils/formatDayLabel';

const ADD_MEAL_BUTTON_SPACE = 96;

export function useHomeController() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { paddingBottom } = useScreenPadding();
  const newMealSheetRef = useRef<BottomSheetModal>(null);
  const deleteMealSheetRef = useRef<BottomSheetModal>(null);
  const [mealIdToDelete, setMealIdToDelete] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isStarting, setIsStarting] = useState(true);
  const { me, isLoadingMe, isRefetchingMe, refetchMe } = useGetMe();
  const { mealsOfDay, isLoadingMeals, isMealsError, isRefetchingMeals, refetchMeals } =
    useListMealsByDay({ date: toLocalIsoDate(selectedDate) });

  if (isStarting && !isLoadingMe && !isLoadingMeals) {
    setIsStarting(false);
  }

  const today = new Date();
  const canGoToNextDay = toLocalIsoDate(selectedDate) < toLocalIsoDate(today);
  const name = me?.profile.name ?? '';
  const meals = mealsOfDay?.meals ?? [];

  function handlePreviousDay() {
    setSelectedDate((date) => addDays(date, -1));
  }

  function handleNextDay() {
    if (canGoToNextDay) {
      setSelectedDate((date) => addDays(date, 1));
    }
  }

  function handleOpenProfile() {
    navigation.navigate('Profile');
  }

  function handleOpenGoals() {
    navigation.navigate('Goals');
  }

  function handleOpenRecipes() {
    navigation.navigate('Recipes');
  }

  function handleOpenNewMeal() {
    newMealSheetRef.current?.present();
  }

  function handleSelectMealSource({ source }: IHandleSelectMealSourceParams) {
    newMealSheetRef.current?.dismiss();

    if (source === 'MANUAL') {
      navigation.navigate('ManualMeal', { date: toLocalIsoDate(selectedDate) });
    }

    if (source === 'PICTURE') {
      navigation.navigate('PictureMeal', { date: toLocalIsoDate(selectedDate) });
    }

    if (source === 'AUDIO') {
      navigation.navigate('AudioMeal', { date: toLocalIsoDate(selectedDate) });
    }
  }

  function handleOpenMeal({ mealId }: IHandleOpenMealParams) {
    navigation.navigate('MealDetails', { mealId });
  }

  function handleDeleteMeal({ mealId }: IHandleDeleteMealParams) {
    setMealIdToDelete(mealId);
    deleteMealSheetRef.current?.present();
  }

  function handleMealDeleted() {
    setMealIdToDelete(null);
  }

  function handleRetryMe() {
    refetchMe();
  }

  function handleRetryMeals() {
    refetchMeals();
  }

  return {
    me,
    shouldShowSplash: isStarting,
    isRefetchingMe,
    firstName: name.split(' ')[0] ?? '',
    initials: getInitials(name),
    dayLabel: formatDayLabel(selectedDate, today),
    canGoToNextDay,
    meals,
    totals: mealsOfDay?.totals ?? null,
    isLoadingMeals,
    isMealsError,
    isRefetchingMeals,
    shouldShowAddMealButton: meals.length > 0,
    listPaddingBottom: paddingBottom + ADD_MEAL_BUTTON_SPACE,
    newMealSheetRef,
    deleteMealSheetRef,
    mealIdToDelete,
    handlePreviousDay,
    handleNextDay,
    handleOpenProfile,
    handleOpenGoals,
    handleOpenRecipes,
    handleOpenNewMeal,
    handleSelectMealSource,
    handleOpenMeal,
    handleDeleteMeal,
    handleMealDeleted,
    handleRetryMe,
    handleRetryMeals,
    handleSignOut: signOut
  };
}
