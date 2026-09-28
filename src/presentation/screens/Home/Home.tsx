import { AppText } from 'presentation/components/AppText/AppText';
import { DeleteMealSheet } from 'presentation/components/DeleteMealSheet/DeleteMealSheet';
import { FlatList, View } from 'react-native';
import { AddMealButton } from './components/AddMealButton/AddMealButton';
import { DailySummary } from './components/DailySummary/DailySummary';
import { DayNavigator } from './components/DayNavigator/DayNavigator';
import { HomeError } from './components/HomeError/HomeError';
import { HomeHeader } from './components/HomeHeader/HomeHeader';
import { HomeSplash } from './components/HomeSplash/HomeSplash';
import { MealCard } from './components/MealCard/MealCard';
import { MealsListEmpty } from './components/MealsListEmpty/MealsListEmpty';
import { NewMealSheet } from './components/NewMealSheet/NewMealSheet';
import { useHomeController } from './useHomeController';

export function Home() {
  const {
    me,
    shouldShowSplash,
    isRefetchingMe,
    firstName,
    initials,
    dayLabel,
    canGoToNextDay,
    meals,
    totals,
    isLoadingMeals,
    isMealsError,
    isRefetchingMeals,
    shouldShowAddMealButton,
    listPaddingBottom,
    newMealSheetRef,
    deleteMealSheetRef,
    mealIdToDelete,
    handlePreviousDay,
    handleNextDay,
    handleOpenProfile,
    handleOpenGoals,
    handleOpenNewMeal,
    handleSelectMealSource,
    handleOpenMeal,
    handleDeleteMeal,
    handleMealDeleted,
    handleRetryMe,
    handleRetryMeals,
    handleSignOut
  } = useHomeController();

  if (shouldShowSplash) {
    return <HomeSplash />;
  }

  if (!me) {
    return (
      <HomeError isRetrying={isRefetchingMe} onRetry={handleRetryMe} onSignOut={handleSignOut} />
    );
  }

  return (
    <View className='flex-1 bg-lime-400'>
      <HomeHeader
        firstName={firstName}
        initials={initials}
        onOpenGoals={handleOpenGoals}
        onOpenProfile={handleOpenProfile}
      />

      <View className='flex-1 overflow-hidden rounded-t-3xl bg-white'>
        <FlatList
          contentContainerClassName='gap-4 px-5 pt-3'
          contentContainerStyle={{ paddingBottom: listPaddingBottom }}
          data={meals}
          keyExtractor={(meal) => meal.id}
          ListEmptyComponent={
            <MealsListEmpty
              isError={isMealsError}
              isLoading={isLoadingMeals}
              isRetrying={isRefetchingMeals}
              onRetry={handleRetryMeals}
              onSelectSource={handleSelectMealSource}
            />
          }
          ListHeaderComponent={
            <View className='gap-4'>
              <DayNavigator
                canGoToNextDay={canGoToNextDay}
                label={dayLabel}
                onNextDay={handleNextDay}
                onPreviousDay={handlePreviousDay}
              />

              {totals && <DailySummary consumed={totals} goals={me.goals} />}

              <AppText accessibilityRole='header' className='pt-2' size='caption'>
                Refeições
              </AppText>
            </View>
          }
          renderItem={({ item }) => (
            <MealCard meal={item} onDelete={handleDeleteMeal} onPress={handleOpenMeal} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {shouldShowAddMealButton && <AddMealButton onPress={handleOpenNewMeal} />}

      <NewMealSheet onSelectSource={handleSelectMealSource} sheetRef={newMealSheetRef} />

      <DeleteMealSheet
        mealId={mealIdToDelete}
        onDeleted={handleMealDeleted}
        sheetRef={deleteMealSheetRef}
      />
    </View>
  );
}
