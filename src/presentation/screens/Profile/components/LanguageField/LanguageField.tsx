import { AppText } from 'presentation/components/AppText/AppText';
import { OptionCard } from 'presentation/components/OptionCard/OptionCard';
import { optionsFieldVariants } from 'presentation/components/OptionsField/OptionsFieldStyles';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LANGUAGE_OPTIONS } from '../../constants/languageOptions';
import type { ILanguageFieldProps } from './LanguageFieldTypes';

export function LanguageField({ language, onSelectLanguage }: ILanguageFieldProps) {
  const { t } = useTranslation();

  return (
    <View className='gap-2'>
      <AppText size='bodySm'>{t('language.title')}</AppText>

      <View
        accessibilityLabel={t('language.title')}
        accessibilityRole='radiogroup'
        className={optionsFieldVariants({ orientation: 'column' })}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <OptionCard
            isSelected={option.value === language}
            key={option.value}
            onPress={() => onSelectLanguage({ language: option.value })}
            option={option}
            orientation='column'
          />
        ))}
      </View>
    </View>
  );
}
