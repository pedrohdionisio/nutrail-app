import { useMutation } from '@tanstack/react-query';
import { MeService } from 'data/modules/me/services/MeService';
import { ME_MUTATION_KEYS } from '../../keys/MeKeys';

export function useDeleteAccount() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [ME_MUTATION_KEYS.DELETE_ACCOUNT],
    mutationFn: MeService.remove
  });

  return {
    deleteAccount: mutateAsync,
    isDeletingAccount: isPending
  };
}
