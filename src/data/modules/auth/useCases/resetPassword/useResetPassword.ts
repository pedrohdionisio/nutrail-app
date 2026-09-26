import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'data/modules/auth/services/AuthService';
import { AUTH_MUTATION_KEYS } from '../../keys/AuthKeys';

export function useResetPassword() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.RESET_PASSWORD],
    mutationFn: AuthService.resetPassword
  });

  return {
    resetPassword: mutateAsync,
    isResettingPassword: isPending
  };
}
