import { StatusBar } from 'expo-status-bar';
import { DeleteMealSheet } from 'presentation/components/DeleteMealSheet/DeleteMealSheet';
import { MacrosPanel } from 'presentation/components/MacrosPanel/MacrosPanel';
import { FlatList, View } from 'react-native';
import { MealDetailsError } from './components/MealDetailsError/MealDetailsError';
import { MealItemRow } from './components/MealItemRow/MealItemRow';
import { MealItemsHeader } from './components/MealItemsHeader/MealItemsHeader';
import { MealItemsSkeleton } from './components/MealItemsSkeleton/MealItemsSkeleton';
import { MealPicture } from './components/MealPicture/MealPicture';
import { SaveMealSheet } from './components/SaveMealSheet/SaveMealSheet';
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
    canSave,
    canDelete,
    canChangePicture,
    isChangingPicture,
    shouldShowError,
    errorMessage,
    isRefetchingMeal,
    listPaddingBottom,
    deleteMealSheetRef,
    saveMealSheetRef,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleMealDeleted,
    handleChangePicture,
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
        canChangePicture={canChangePicture}
        canDelete={canDelete}
        canEdit={canEdit}
        canSave={canSave}
        isChangingPicture={isChangingPicture}
        isLoading={isLoadingMeal}
        onBack={handleGoBack}
        onChangePicture={handleChangePicture}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSave={handleSave}
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
            <MacrosPanel macros={meal} />
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

      <SaveMealSheet mealId={mealId} sheetRef={saveMealSheetRef} />
    </View>
  );
}
