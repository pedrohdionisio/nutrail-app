import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { EditMealFooter } from './components/EditMealFooter/EditMealFooter';
import { EditMealForm } from './components/EditMealForm/EditMealForm';
import { useEditMealController } from './useEditMealController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function EditMeal() {
  const { t } = useTranslation();
  const {
    control,
    items,
    shouldShowEmptyItems,
    apiErrorMessage,
    isUpdatingMeal,
    isSaveDisabled,
    handleGoBack,
    handleRemoveItem,
    handleAddItems,
    handleSave
  } = useEditMealController();

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader onBack={handleGoBack} title={t('common.editMeal')} />

      <EditMealForm
        apiErrorMessage={apiErrorMessage}
        control={control}
        items={items}
        onAddItems={handleAddItems}
        onRemoveItem={handleRemoveItem}
        shouldShowEmptyItems={shouldShowEmptyItems}
      />
      <EditMealFooter
        isSaveDisabled={isSaveDisabled}
        isSaving={isUpdatingMeal}
        onCancel={handleGoBack}
        onSave={handleSave}
      />
    </KeyboardAvoidingView>
  );
}
