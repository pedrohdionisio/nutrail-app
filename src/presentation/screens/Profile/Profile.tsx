import LogOutIcon from 'lucide-react-native/icons/log-out';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ChangePasswordSheet } from './components/ChangePasswordSheet/ChangePasswordSheet';
import { DeleteAccountSheet } from './components/DeleteAccountSheet/DeleteAccountSheet';
import { ProfileFooter } from './components/ProfileFooter/ProfileFooter';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
import { useProfileController } from './useProfileController';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export function Profile() {
  const { t } = useTranslation();
  const {
    control,
    initials,
    apiErrorMessage,
    language,
    isUpdatingProfile,
    isSaveDisabled,
    handleSelectLanguage,
    handleGoBack,
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
        action={{
          icon: LogOutIcon,
          accessibilityLabel: t('profile.signOut'),
          onPress: handleSignOut
        }}
        onBack={handleGoBack}
        title={t('profile.title')}
      />

      <ProfileForm
        apiErrorMessage={apiErrorMessage}
        control={control}
        initials={initials}
        language={language}
        onChangePassword={handleChangePassword}
        onDeleteAccount={handleDeleteAccount}
        onSelectLanguage={handleSelectLanguage}
      />
      <ProfileFooter
        isSaveDisabled={isSaveDisabled}
        isSaving={isUpdatingProfile}
        onSave={handleSave}
      />

      <ChangePasswordSheet sheetRef={changePasswordSheetRef} />
      <DeleteAccountSheet sheetRef={deleteAccountSheetRef} />
    </KeyboardAvoidingView>
  );
}
