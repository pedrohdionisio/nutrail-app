import { AppText } from 'presentation/components/AppText/AppText';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { ACTION_BUTTON_ICON_COLORS, actionButtonVariants } from './ActionButtonStyles';
import type { IActionButtonProps } from './ActionButtonTypes';

export function ActionButton({
  icon: Icon,
  accessibilityLabel,
  onPress,
  variant = 'dark',
  label,
  disabled = false,
  isLoading = false
}: IActionButtonProps) {
  const isDisabled = disabled || isLoading;
  const iconColor = ACTION_BUTTON_ICON_COLORS[variant];

  return (
    <View className='items-center gap-3'>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole='button'
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        className={actionButtonVariants({ variant, isDisabled })}
        disabled={isDisabled}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator color={iconColor} />
        ) : (
          <Icon color={iconColor} size={22} strokeWidth={1.8} />
        )}
      </Pressable>

      {label && <AppText color='inverse'>{label}</AppText>}
    </View>
  );
}
