import { AppText } from 'presentation/components/AppText/AppText';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { optionCardVariants, optionIconVariants } from './OptionCardStyles';
import type { IOptionCardProps } from './OptionCardTypes';

export function OptionCard({ option, isSelected, orientation, onPress }: IOptionCardProps) {
  const { t } = useTranslation();
  const { icon: Icon } = option;
  const label = t(option.label);
  const description = option.description && t(option.description);

  return (
    <Pressable
      accessibilityHint={description}
      accessibilityLabel={label}
      accessibilityRole='radio'
      accessibilityState={{ checked: isSelected }}
      className={optionCardVariants({ orientation, isSelected })}
      onPress={onPress}
    >
      <View className={optionIconVariants({ isSelected })}>
        <Icon color={COLORS.black[700]} size={22} strokeWidth={1.8} />
      </View>

      <View className='gap-1'>
        <AppText weight='medium'>{label}</AppText>

        {!!description && <AppText color='muted'>{description}</AppText>}
      </View>
    </Pressable>
  );
}
