import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { changeLanguage, toLanguage } from 'data/config/i18n';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useGetMe } from 'data/modules/me/useCases/getMe/useGetMe';
import {
  type UpdateProfileFormType,
  type UpdateProfilePayloadType,
  updateProfileSchema
} from 'data/modules/profile/useCases/updateProfile/schemas/updateProfileSchema';
import { useUpdateProfile } from 'data/modules/profile/useCases/updateProfile/useUpdateProfile';
import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getInitials } from 'shared/utils/getInitials';
import type { ISelectLanguageParams } from './components/LanguageField/LanguageFieldTypes';
import { toProfileFormValues } from './utils/toProfileFormValues';

export function useProfileController() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const { signOut } = useAuth();
  const { me } = useGetMe();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const deleteAccountSheetRef = useRef<BottomSheetModal>(null);
  const changePasswordSheetRef = useRef<BottomSheetModal>(null);

  const { control, handleSubmit } = useForm<
    UpdateProfileFormType,
    unknown,
    UpdateProfilePayloadType
  >({
    resolver: zodResolver(updateProfileSchema),
    values: me ? toProfileFormValues(me.profile) : undefined,
    resetOptions: { keepDirtyValues: true }
  });

  const [name, birthDate, height, weight] = useWatch({
    control,
    name: ['name', 'birthDate', 'height', 'weight']
  });

  async function onSubmit(profile: UpdateProfilePayloadType) {
    setApiErrorMessage(null);

    try {
      await updateProfile(profile);
      navigation.goBack();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  async function handleSelectLanguage({ language }: ISelectLanguageParams) {
    await changeLanguage(toLanguage(language));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangePassword() {
    changePasswordSheetRef.current?.present();
  }

  function handleDeleteAccount() {
    deleteAccountSheetRef.current?.present();
  }

  return {
    control,
    initials: getInitials(name ?? me?.profile.name ?? ''),
    apiErrorMessage,
    language: toLanguage(i18n.language),
    isUpdatingProfile,
    isSaveDisabled: !name?.trim() || !birthDate || !height || !weight,
    handleSelectLanguage,
    handleGoBack,
    handleSave: handleSubmit(onSubmit),
    handleSignOut: signOut,
    deleteAccountSheetRef,
    changePasswordSheetRef,
    handleChangePassword,
    handleDeleteAccount
  };
}
