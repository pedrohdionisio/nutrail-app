import { AppText } from 'presentation/components/AppText/AppText';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { View } from 'react-native';
import { MacroShareColumn } from './components/MacroShareColumn/MacroShareColumn';
import type { IMacrosPanelProps } from './MacrosPanelTypes';
import { toMacroShares } from './utils/toMacroShares';

export function MacrosPanel({ macros }: IMacrosPanelProps) {
  const shares = toMacroShares(macros);

  return (
    <View>
      <View className='h-16 flex-row items-center justify-between gap-4 bg-black-700 px-4'>
        <AppText color='inverse' weight='medium'>
          Macros Totais
        </AppText>

        <View className='flex-row items-center gap-2'>
          <AppText color='inverseMuted'>Calorias</AppText>

          {macros ? (
            <AppText color='inverse' weight='medium'>{`${macros.calories}kcal`}</AppText>
          ) : (
            <Skeleton className='w-16' />
          )}
        </View>
      </View>

      <View className='gap-6 px-5 pt-6 pb-10'>
        <View className='flex-row gap-6'>
          {shares.map((share) => (
            <MacroShareColumn key={share.key} share={share} />
          ))}
        </View>

        <View className='h-1 flex-row overflow-hidden rounded-full bg-gray-400'>
          {shares.map((share) => (
            <View className={share.barClassName} key={share.key} style={{ flex: share.percent }} />
          ))}
        </View>
      </View>

      <View className='h-px overflow-hidden'>
        <View className='h-0.5 border border-gray-400 border-dashed' />
      </View>
    </View>
  );
}
