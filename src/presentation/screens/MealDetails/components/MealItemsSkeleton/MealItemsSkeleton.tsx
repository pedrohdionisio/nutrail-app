import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

const SKELETON_ROWS = ['first', 'second', 'third'];

export function MealItemsSkeleton() {
  const { t } = useTranslation();
  return (
    <View accessibilityLabel={t('mealDetails.loading')} accessible>
      {SKELETON_ROWS.map((row) => (
        <View className='border-gray-400 border-b px-3 py-4' key={row}>
          <Skeleton />
        </View>
      ))}
    </View>
  );
}
