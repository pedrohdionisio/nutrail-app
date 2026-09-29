import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { MacroStat } from './components/MacroStat/MacroStat';
import type { IMacroStatsProps } from './MacroStatsTypes';

export function MacroStats({ macros }: IMacroStatsProps) {
  const { t } = useTranslation();
  const { calories, protein, carbohydrate, fat } = macros;

  return (
    <View className='flex-row rounded-xl bg-gray-100 py-3'>
      <MacroStat dotClassName='bg-support-tomato' label='kcal' value={`${calories}`} />
      <MacroStat dotClassName='bg-support-teal' label={t('common.protein')} value={`${protein}g`} />
      <MacroStat
        dotClassName='bg-support-yellow'
        label={t('common.carbohydrateShort')}
        value={`${carbohydrate}g`}
      />
      <MacroStat dotClassName='bg-support-orange' label={t('common.fat')} value={`${fat}g`} />
    </View>
  );
}
