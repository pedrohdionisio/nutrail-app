import { AppText } from 'presentation/components/AppText/AppText';
import { DateTimePickerSheet } from 'presentation/components/DateTimePickerSheet/DateTimePickerSheet';
import { MealTimeButton } from 'presentation/components/MealTimeButton/MealTimeButton';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { FlatList, View } from 'react-native';
import { DeleteSavedMealSheet } from './components/DeleteSavedMealSheet/DeleteSavedMealSheet';
import { SavedMealCard } from './components/SavedMealCard/SavedMealCard';
import { SavedMealsListEmpty } from './components/SavedMealsListEmpty/SavedMealsListEmpty';
import { useSavedMealsController } from './useSavedMealsController';

export function SavedMeals() {
  const {
    savedMeals,
    isLoadingSavedMeals,
    isSavedMealsError,
    isRefetchingSavedMeals,
    shouldShowTimeButton,
    creatingSavedMealId,
    isCreatingMeal,
    timeLabel,
    timePickerSheetBindings,
    listPaddingBottom,
    deleteSavedMealSheetRef,
    savedMealIdToDelete,
    handleGoBack,
    handleOpenTimePicker,
    handleSelectSavedMeal,
    handleDeleteSavedMeal,
    handleSavedMealDeleted,
    handleRetry
  } = useSavedMealsController();

  return (
    <View className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title='Refeições salvas' />

      <FlatList
        contentContainerClassName='grow gap-4 px-5 pt-6'
        contentContainerStyle={{ paddingBottom: listPaddingBottom }}
        data={savedMeals}
        keyExtractor={(savedMeal) => savedMeal.id}
        ListEmptyComponent={
          <SavedMealsListEmpty
            isError={isSavedMealsError}
            isLoading={isLoadingSavedMeals}
            isRetrying={isRefetchingSavedMeals}
            onRetry={handleRetry}
          />
        }
        ListHeaderComponent={
          shouldShowTimeButton ? (
            <View className='gap-3 pb-2'>
              <MealTimeButton onPress={handleOpenTimePicker} time={timeLabel} />

              <AppText align='center' color='muted' size='bodySm'>
                Toque em uma refeição para cadastrá-la.
              </AppText>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <SavedMealCard
            isCreating={creatingSavedMealId === item.id}
            isDisabled={isCreatingMeal}
            onDelete={handleDeleteSavedMeal}
            onPress={handleSelectSavedMeal}
            savedMeal={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <DateTimePickerSheet {...timePickerSheetBindings} title='Horário da refeição' />

      <DeleteSavedMealSheet
        onDeleted={handleSavedMealDeleted}
        savedMealId={savedMealIdToDelete}
        sheetRef={deleteSavedMealSheetRef}
      />
    </View>
  );
}
