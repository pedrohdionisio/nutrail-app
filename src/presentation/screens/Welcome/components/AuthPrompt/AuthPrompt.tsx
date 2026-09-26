import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import type { IAuthPromptProps } from './AuthPromptTypes';

export function AuthPrompt({ question, actionLabel, onPress }: IAuthPromptProps) {
  return (
    <View className='flex-row items-center justify-center gap-1'>
      <AppText color='inverse'>{question}</AppText>

      <Pressable
        accessibilityRole='link'
        className='active:opacity-80'
        hitSlop={12}
        onPress={onPress}
      >
        <AppText color='brand'>{actionLabel}</AppText>
      </Pressable>
    </View>
  );
}
