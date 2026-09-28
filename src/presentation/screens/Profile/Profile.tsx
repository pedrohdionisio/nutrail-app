import LogOutIcon from 'lucide-react-native/icons/log-out';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ChangePasswordSheet } from './components/ChangePasswordSheet/ChangePasswordSheet';
import { DeleteAccountSheet } from './components/DeleteAccountSheet/DeleteAccountSheet';
import { ProfileFallback } from './components/ProfileFallback/ProfileFallback';
import { ProfileFooter } from './components/ProfileFooter/ProfileFooter';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
import { useProfileController } from './useProfileController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function Profile() {
  const {
    control,
    shouldShowForm,
    isLoadingMe,
    isRefetchingMe,
    initials,
    apiErrorMessage,
    isUpdatingProfile,
    isSaveDisabled,
    handleGoBack,
    handleRetry,
    handleSave,
    handleSignOut,
    deleteAccountSheetRef,
    changePasswordSheetRef,
    handleChangePassword,
    handleDeleteAccount
  } = useProfileController();

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_BEHAVIOR} className='flex-1 bg-white'>
      <ScreenHeader
        action={{ icon: LogOutIcon, accessibilityLabel: 'Sair', onPress: handleSignOut }}
        onBack={handleGoBack}
        title='Perfil'
      />

      {shouldShowForm ? (
        <>
          <ProfileForm
            apiErrorMessage={apiErrorMessage}
            control={control}
            initials={initials}
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
          <ProfileFooter
            isSaveDisabled={isSaveDisabled}
            isSaving={isUpdatingProfile}
            onSave={handleSave}
          />
        </>
      ) : (
        <ProfileFallback
          isLoading={isLoadingMe}
          isRetrying={isRefetchingMe}
          onRetry={handleRetry}
        />
      )}

      <ChangePasswordSheet sheetRef={changePasswordSheetRef} />
      <DeleteAccountSheet sheetRef={deleteAccountSheetRef} />
    </KeyboardAvoidingView>
  );
}
