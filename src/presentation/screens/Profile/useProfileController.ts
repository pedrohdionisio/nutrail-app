import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { changeLanguage, toLanguage } from 'data/config/i18n';
import { useAuth } from 'data/contexts/AuthProvider/AuthProvider';
import { useOpenBillingPortal } from 'data/modules/billing/useCases/openBillingPortal/useOpenBillingPortal';
import { useStartCheckout } from 'data/modules/billing/useCases/startCheckout/useStartCheckout';
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
import { Alert } from 'react-native';
import type { IMe } from 'shared/entities/IMe';
import { getInitials } from 'shared/utils/getInitials';
import { toDateInput } from 'shared/utils/toDateInput';
import { toLocalIsoDate } from 'shared/utils/toLocalIsoDate';
import type { ISelectLanguageParams } from './components/LanguageField/LanguageFieldTypes';
import type { IPlanSectionView } from './components/PlanSection/PlanSectionTypes';
import { toProfileFormValues } from './utils/toProfileFormValues';

export function useProfileController() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { signOut } = useAuth();
  const { me } = useGetMe();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const { startCheckout, isStartingCheckout } = useStartCheckout();
  const { openBillingPortal, isOpeningBillingPortal } = useOpenBillingPortal();
  const language = toLanguage(i18n.language);
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

  function handleSave() {
    return handleSubmit(onSubmit)();
  }

  async function handleManagePlan() {
    if (!me) {
      return;
    }

    const { subscription } = me;

    try {
      if (subscription.plan === 'PREMIUM') {
        await openBillingPortal({ subscription });

        return;
      }

      const outcome = await startCheckout({ subscription });

      if (outcome === 'ACTIVATED') {
        Alert.alert(t('profile.premiumActivatedTitle'), t('profile.premiumActivatedMessage'));
      }

      if (outcome === 'PENDING') {
        Alert.alert(t('profile.premiumPendingTitle'), t('profile.premiumPendingMessage'));
      }
    } catch (error) {
      Alert.alert(t('profile.planError'), getApiErrorMessage(error));
    }
  }

  function toPlanView({ subscription, dailyLimits }: IMe): IPlanSectionView | null {
    if (!subscription.available) {
      return null;
    }

    const isPremium = subscription.plan === 'PREMIUM';

    return {
      title: t(isPremium ? 'profile.planPremium' : 'profile.planFree'),
      limits: t('profile.planLimits', {
        mealAnalyses: dailyLimits.mealAnalyses,
        recipes: dailyLimits.recipes
      }),
      cancelAtLabel: subscription.cancelAt
        ? t('profile.premiumUntil', {
            date: toDateInput(toLocalIsoDate(new Date(subscription.cancelAt)), language)
          })
        : null,
      actionTitle: t(isPremium ? 'profile.manageSubscription' : 'profile.subscribe'),
      isLoading: isStartingCheckout || isOpeningBillingPortal
    };
  }

  return {
    control,
    initials: getInitials(name ?? me?.profile.name ?? ''),
    apiErrorMessage,
    language,
    plan: me ? toPlanView(me) : null,
    handleManagePlan,
    isUpdatingProfile,
    isSaveDisabled: !name?.trim() || !birthDate || !height || !weight,
    handleSelectLanguage,
    handleGoBack,
    handleSave,
    handleSignOut: signOut,
    deleteAccountSheetRef,
    changePasswordSheetRef,
    handleChangePassword,
    handleDeleteAccount
  };
}
