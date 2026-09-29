import { AppText } from 'presentation/components/AppText/AppText';
import { Input } from 'presentation/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { GoalsModeSelector } from '../GoalsModeSelector/GoalsModeSelector';
import type { IGoalsFormProps } from './GoalsFormTypes';

export function GoalsForm({
  control,
  mode,
  isCaloriesMode,
  apiErrorMessage,
  onSelectMode
}: IGoalsFormProps) {
  const { t } = useTranslation();
  return (
    <ScrollView
      className='flex-1'
      contentContainerClassName='gap-8 px-5 py-8'
      keyboardDismissMode='interactive'
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <GoalsModeSelector mode={mode} onSelectMode={onSelectMode} />

      {isCaloriesMode ? (
        <>
          <Input
            control={control}
            keyboardType='number-pad'
            label={t('common.calories')}
            name='calories'
            unit='kcal'
          />

          <AppText color='muted' size='bodySm'>
            {t('goals.byCaloriesHint')}
          </AppText>
        </>
      ) : (
        <>
          <Input
            control={control}
            keyboardType='number-pad'
            label={t('common.carbohydrate')}
            name='carbohydrate'
            unit='g'
          />
          <Input
            control={control}
            keyboardType='number-pad'
            label={t('common.protein')}
            name='protein'
            unit='g'
          />
          <Input
            control={control}
            keyboardType='number-pad'
            label={t('common.fat')}
            name='fat'
            unit='g'
          />

          <AppText color='muted' size='bodySm'>
            {t('goals.byMacrosHint')}
          </AppText>
        </>
      )}

      {!!apiErrorMessage && (
        <AppText color='error' size='bodySm'>
          {apiErrorMessage}
        </AppText>
      )}
    </ScrollView>
  );
}
