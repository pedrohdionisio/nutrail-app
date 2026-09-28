import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IChangePasswordSheetProps } from './ChangePasswordSheetTypes';
import { useChangePasswordSheetController } from './useChangePasswordSheetController';

const SHEET_BACKGROUND = { backgroundColor: COLORS.white, borderRadius: 24 };

const HANDLE_INDICATOR = { backgroundColor: COLORS.gray[500], width: 40 };

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.4}
      pressBehavior='close'
    />
  );
}

export function ChangePasswordSheet({ sheetRef }: IChangePasswordSheetProps) {
  const {
    paddingBottom,
    control,
    apiErrorMessage,
    isChangingPassword,
    isSubmitDisabled,
    handleSubmit,
    handleDismiss
  } = useChangePasswordSheetController({ sheetRef });

  return (
    <BottomSheetModal
      android_keyboardInputMode='adjustResize'
      backdropComponent={renderBackdrop}
      backgroundStyle={SHEET_BACKGROUND}
      handleIndicatorStyle={HANDLE_INDICATOR}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      onDismiss={handleDismiss}
      ref={sheetRef}
    >
      <BottomSheetScrollView keyboardShouldPersistTaps='handled'>
        <View className='gap-6 px-5 pt-4' style={{ paddingBottom }}>
          <AppText accessibilityRole='header' size='bodyXl' weight='semibold'>
            Alterar senha
          </AppText>

          <Input
            autoCapitalize='none'
            autoComplete='current-password'
            control={control}
            label='Senha atual'
            name='currentPassword'
            secureTextEntry
          />

          <Input
            autoCapitalize='none'
            autoComplete='new-password'
            control={control}
            label='Nova senha'
            name='newPassword'
            secureTextEntry
          />

          <Input
            autoCapitalize='none'
            autoComplete='new-password'
            control={control}
            label='Confirme a nova senha'
            name='newPasswordConfirmation'
            secureTextEntry
          />

          {!!apiErrorMessage && (
            <AppText color='error' size='bodySm'>
              {apiErrorMessage}
            </AppText>
          )}

          <Button
            disabled={isSubmitDisabled}
            isLoading={isChangingPassword}
            onPress={handleSubmit}
            title='Salvar nova senha'
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
