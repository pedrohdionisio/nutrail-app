import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { avatarVariants } from './AvatarStyles';
import type { IAvatarProps } from './AvatarTypes';

export function Avatar({ initials, size }: IAvatarProps) {
  return (
    <View
      accessibilityElementsHidden
      className={avatarVariants({ size })}
      importantForAccessibility='no-hide-descendants'
    >
      <AppText color='inverse' size={size === 'lg' ? 'title1' : 'body'} weight='semibold'>
        {initials}
      </AppText>
    </View>
  );
}
