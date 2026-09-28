import { useMutation } from '@tanstack/react-query';
import { MeService } from 'data/modules/me/services/MeService';
import { ME_MUTATION_KEYS } from '../../keys/MeKeys';

export function useChangePassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [ME_MUTATION_KEYS.CHANGE_PASSWORD],
    mutationFn: MeService.changePassword
  });

  return {
    changePassword: mutateAsync,
    isChangingPassword: isPending
  };
}
