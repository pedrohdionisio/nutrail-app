import { useMutation } from '@tanstack/react-query';
import { AuthService } from 'data/modules/auth/services/AuthService';
import { AUTH_MUTATION_KEYS } from '../../keys/AuthKeys';

export function useRequestPasswordReset() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.REQUEST_PASSWORD_RESET],
    mutationFn: AuthService.requestPasswordReset
  });

  return {
    requestPasswordReset: mutateAsync,
    isRequestingPasswordReset: isPending
  };
}
