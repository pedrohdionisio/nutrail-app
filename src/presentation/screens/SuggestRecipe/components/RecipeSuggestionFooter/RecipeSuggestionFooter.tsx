import { Button } from 'presentation/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IRecipeSuggestionFooterProps } from './RecipeSuggestionFooterTypes';

const FOOTER_BOTTOM_SPACING = 16;

export function RecipeSuggestionFooter({
  isSaving,
  onSuggestAgain,
  onSave
}: IRecipeSuggestionFooterProps) {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className='flex-row gap-4 border-gray-400 border-t bg-white px-5 pt-5'
      style={{ paddingBottom: bottom + FOOTER_BOTTOM_SPACING }}
    >
      <Button
        className='flex-1'
        disabled={isSaving}
        onPress={onSuggestAgain}
        title={t('recipes.suggestAnother')}
        variant='secondary'
      />
      <Button className='flex-1' isLoading={isSaving} onPress={onSave} title={t('recipes.save')} />
    </View>
  );
}
