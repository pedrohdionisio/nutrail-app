import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { useHomeController } from './useHomeController';

export function Home() {
  const { handleSignOut } = useHomeController();

  return (
    <ScreenLayout className='gap-2'>
      <AppText size='caption'>Nutrail</AppText>
      <AppText size='title1'>Olá!</AppText>

      <Button className='mt-auto' onPress={handleSignOut} title='Sair' variant='secondary' />
    </ScreenLayout>
  );
}
