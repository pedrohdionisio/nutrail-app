import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ME_QUERY_KEYS } from 'data/modules/me/keys/MeKeys';
import { ProfileService } from 'data/modules/profile/services/ProfileService';
import type { IMe } from 'shared/entities/IMe';
import { PROFILE_MUTATION_KEYS } from '../../keys/ProfileKeys';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [PROFILE_MUTATION_KEYS.UPDATE_PROFILE],
    mutationFn: ProfileService.update,
    onSuccess: ({ goals }, profile) => {
      queryClient.setQueryData<IMe>(
        [ME_QUERY_KEYS.ME],
        (me) => me && { profile: { ...me.profile, ...profile }, goals }
      );
    }
  });

  return {
    updateProfile: mutateAsync,
    isUpdatingProfile: isPending
  };
}
