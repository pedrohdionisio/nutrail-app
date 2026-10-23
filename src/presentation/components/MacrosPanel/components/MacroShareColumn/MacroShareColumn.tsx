import { AppText } from 'presentation/components/AppText/AppText';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { IMacroShareColumnProps } from './MacroShareColumnTypes';

export function MacroShareColumn({ share }: IMacroShareColumnProps) {
  const { t } = useTranslation();
  return (
    <View className='flex-1 items-center gap-3'>
      <AppText
        adjustsFontSizeToFit
        color='muted'
        minimumFontScale={0.85}
        numberOfLines={1}
        size='bodySm'
      >
        {t(share.label)}
      </AppText>

      {share.value ? (
        <AppText className={share.textClassName} weight='medium'>
          {share.value}
        </AppText>
      ) : (
        <Skeleton className='w-full' />
      )}
    </View>
  );
}
