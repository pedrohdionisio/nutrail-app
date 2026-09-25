import { AppText } from 'presentation/components/AppText/AppText';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';

export function Home() {
  return (
    <ScreenLayout className='gap-2'>
      <AppText size='caption'>Nutrail</AppText>
      <AppText size='title1'>Olá!</AppText>
    </ScreenLayout>
  );
}
