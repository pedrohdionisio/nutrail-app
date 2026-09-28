import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
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
import { getInitials } from 'shared/utils/getInitials';
import { toProfileFormValues } from './utils/toProfileFormValues';

export function useProfileController() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { me, isLoadingMe, isRefetchingMe, refetchMe } = useGetMe();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const deleteAccountSheetRef = useRef<BottomSheetModal>(null);

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
    if (!me) {
      return;
    }

    setApiErrorMessage(null);

    try {
      await updateProfile({
        ...profile,
        goal: me.profile.goal,
        activityLevel: me.profile.activityLevel
      });
      navigation.goBack();
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleRetry() {
    refetchMe();
  }

  function handleDeleteAccount() {
    deleteAccountSheetRef.current?.present();
  }

  return {
    control,
    shouldShowForm: !!me,
    isLoadingMe,
    isRefetchingMe,
    initials: getInitials(name ?? me?.profile.name ?? ''),
    apiErrorMessage,
    isUpdatingProfile,
    isSaveDisabled: !name?.trim() || !birthDate || !height || !weight,
    handleGoBack,
    handleRetry,
    handleSave: handleSubmit(onSubmit),
    handleSignOut: signOut,
    deleteAccountSheetRef,
    handleDeleteAccount
  };
}
