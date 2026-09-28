import { AppText } from 'presentation/components/AppText/AppText';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import type { IMealItemsHeaderProps } from './MealItemsHeaderTypes';

export function MealItemsHeader({ name }: IMealItemsHeaderProps) {
  return (
    <View className='gap-8 px-5 pt-10 pb-2'>
      {name ? (
        <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
          {name}
        </AppText>
      ) : (
        <Skeleton className='h-7 w-full' />
      )}

      <AppText color='muted'>Itens</AppText>
    </View>
  );
}
