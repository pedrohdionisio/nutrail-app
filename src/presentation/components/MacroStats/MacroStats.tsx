import { View } from 'react-native';
import { MacroStat } from './components/MacroStat/MacroStat';
import type { IMacroStatsProps } from './MacroStatsTypes';

export function MacroStats({ macros }: IMacroStatsProps) {
  const { calories, protein, carbohydrate, fat } = macros;

  return (
    <View className='flex-row rounded-xl bg-gray-100 py-3'>
      <MacroStat dotClassName='bg-support-tomato' label='kcal' value={`${calories}`} />
      <MacroStat dotClassName='bg-support-teal' label='Proteínas' value={`${protein}g`} />
      <MacroStat dotClassName='bg-support-yellow' label='Carbos' value={`${carbohydrate}g`} />
      <MacroStat dotClassName='bg-support-orange' label='Gorduras' value={`${fat}g`} />
    </View>
  );
}
