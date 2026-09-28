import { StatusBar } from 'expo-status-bar';
import { DeleteMealSheet } from 'presentation/components/DeleteMealSheet/DeleteMealSheet';
import { FlatList, View } from 'react-native';
import { MealDetailsError } from './components/MealDetailsError/MealDetailsError';
import { MealItemRow } from './components/MealItemRow/MealItemRow';
import { MealItemsHeader } from './components/MealItemsHeader/MealItemsHeader';
import { MealItemsSkeleton } from './components/MealItemsSkeleton/MealItemsSkeleton';
import { MealMacros } from './components/MealMacros/MealMacros';
import { MealPicture } from './components/MealPicture/MealPicture';
import { useMealDetailsController } from './useMealDetailsController';

export function MealDetails() {
  const {
    mealId,
    meal,
    mealName,
    items,
    pictureUrl,
    isLoadingMeal,
    canEdit,
    canDelete,
    shouldShowError,
    errorMessage,
    isRefetchingMeal,
    listPaddingBottom,
    deleteMealSheetRef,
    handleGoBack,
    handleEdit,
    handleDelete,
    handleMealDeleted,
    handleRetry
  } = useMealDetailsController();

  if (shouldShowError) {
    return (
      <MealDetailsError
        isRetrying={isRefetchingMeal}
        message={errorMessage}
        onBack={handleGoBack}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='light' />

      <MealPicture
        canDelete={canDelete}
        canEdit={canEdit}
        isLoading={isLoadingMeal}
        onBack={handleGoBack}
        onDelete={handleDelete}
        onEdit={handleEdit}
        pictureUrl={pictureUrl}
      />

      <FlatList
        contentContainerClassName='px-5'
        contentContainerStyle={{ paddingBottom: listPaddingBottom }}
        data={items}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        ListEmptyComponent={isLoadingMeal ? <MealItemsSkeleton /> : null}
        ListHeaderComponent={
          <View className='-mx-5'>
            <MealMacros macros={meal} />
            <MealItemsHeader name={mealName} />
          </View>
        }
        renderItem={({ item }) => <MealItemRow item={item} />}
        showsVerticalScrollIndicator={false}
      />

      <DeleteMealSheet
        mealId={mealId}
        onDeleted={handleMealDeleted}
        sheetRef={deleteMealSheetRef}
      />
    </View>
  );
}
