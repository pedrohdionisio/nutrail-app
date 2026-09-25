import { ScrollView } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import { cn } from 'shared/utils/cn';
import type { IScreenLayoutProps } from './ScreenLayoutTypes';

export function ScreenLayout({ children, className }: IScreenLayoutProps) {
  const contentPadding = useScreenPadding();

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      className='flex-1 bg-white'
      contentContainerClassName={cn('grow px-5', className)}
      contentContainerStyle={contentPadding}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
