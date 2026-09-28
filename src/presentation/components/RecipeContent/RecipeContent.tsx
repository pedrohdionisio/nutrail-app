import { AppText } from 'presentation/components/AppText/AppText';
import { MacrosPanel } from 'presentation/components/MacrosPanel/MacrosPanel';
import { SectionList, View } from 'react-native';
import type { IRecipeContentProps } from './RecipeContentTypes';
import { toRecipeSections } from './utils/toRecipeSections';

export function RecipeContent({ recipe, paddingBottom }: IRecipeContentProps) {
  return (
    <SectionList
      className='flex-1'
      contentContainerStyle={{ paddingBottom }}
      keyExtractor={(item, index) => `${index}-${item}`}
      ListHeaderComponent={
        <View>
          <MacrosPanel macros={recipe} />

          <View className='px-5 pt-10'>
            <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
              {recipe.name}
            </AppText>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View className='mx-5 border-gray-400 border-b px-3 py-4'>
          <AppText>{item}</AppText>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View className='px-5 pt-8 pb-2'>
          <AppText color='muted'>{section.title}</AppText>
        </View>
      )}
      sections={toRecipeSections(recipe)}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  );
}
